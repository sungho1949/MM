// routes.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const Graph = require("./dijkstra");

// 경로 계산 및 사용자에게 선택지 제공
router.post("/searchRoutes", async (req, res) => {
  const { startStation, endStation } = req.body;

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

    // 최소 시간 경로 계산
    const shortestTimePath = graph.findShortestPath(startStation, endStation, "time");

    // 최단 거리 경로 계산
    const shortestDistancePath = graph.findShortestPath(startStation, endStation, "distance");

    // 최소 비용 경로 계산
    const lowestCostPath = graph.findShortestPath(startStation, endStation, "cost");

    // 결과를 사용자에게 제공
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

// 사용자가 선택한 경로에 대한 세부 정보 제공
router.post("/selectRoute", (req, res) => {
  const { selectedRoute } = req.body;

  // 선택한 경로의 정보를 제공 (세부 정보 출력, 예를 들어 경로 시각화 등)
  res.status(200).json({
    message: "Route selected",
    route: selectedRoute,
  });
});

module.exports = router;
