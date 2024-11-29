// routes.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const Graph = require("./dijkstra");

// 경로 계산 및 사용자에게 선택지 제공
router.post("/searchRoutes", async (req, res) => {
  const { userId, startStation, endStation } = req.body;

  try {
    // 그래프 객체 생성
    const graph = new Graph();

    // 모든 역과 연결 정보 가져오기
    const stationsSnapshot = await db.collection("Stations").get();
    const connectionsSnapshot = await db.collection("Connections").get();

    if (stationsSnapshot.empty || connectionsSnapshot.empty) {
      return res.status(404).send("No stations or connections found");
    }

    // 역 추가
    stationsSnapshot.docs.forEach(doc => {
      graph.addNode(doc.id);
    });

    // 연결 정보 추가
    connectionsSnapshot.docs.forEach(doc => {
      const { startStation, endStation, time, distance, cost } = doc.data();
      graph.addEdge(startStation, endStation, time, distance, cost);
    });

    // 최소 시간, 최단 거리, 최소 비용 경로 계산
    const shortestTimePath = graph.findShortestPath(startStation, endStation, "time");
    const shortestDistancePath = graph.findShortestPath(startStation, endStation, "distance");
    const lowestCostPath = graph.findShortestPath(startStation, endStation, "cost");

    // 사용 기록 업데이트
    const usageRef = db.collection("UsageHistory").doc(`${userId}_${startStation}_${endStation}`);
    const usageDoc = await usageRef.get();

    if (usageDoc.exists) {
      // 기존 사용 기록이 있는 경우
      const usageData = usageDoc.data();
      const newCount = usageData.count + 1;

      // 사용 횟수 업데이트
      await usageRef.update({ count: newCount });

      // 사용 횟수가 5번 이상이면 즐겨찾기에 추가
      if (newCount >= 5) {
        const favoritesRef = db.collection("Favorites").doc(userId);
        const favoritesDoc = await favoritesRef.get();

        if (favoritesDoc.exists) {
          const favoritesData = favoritesDoc.data();
          if (!favoritesData.routes.some(route => route.startStation === startStation && route.endStation === endStation)) {
            await favoritesRef.update({
              routes: admin.firestore.FieldValue.arrayUnion({ startStation, endStation })
            });
          }
        } else {
          await favoritesRef.set({
            routes: [{ startStation, endStation }]
          });
        }
      }
    } else {
      // 사용 기록이 없는 경우 새로 생성
      await usageRef.set({ userId, startStation, endStation, count: 1 });
    }

    // 사용자에게 경로 제공
    const routes = [
      {
        criteria: "time",
        path: shortestTimePath.path,
        distance: shortestTimePath.distance,
      },
      {
        criteria: "distance",
        path: shortestDistancePath.path,
        distance: shortestDistancePath.distance,
      },
      {
        criteria: "cost",
        path: lowestCostPath.path,
        distance: lowestCostPath.distance,
      },
    ];

    res.status(200).json(routes);
  } catch (error) {
    res.status(500).send("Error calculating routes: " + error.message);
  }
});

module.exports = router;
