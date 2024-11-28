// routes.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const dijkstra = require("./utils/dijkstra");

// 최단 경로 검색 API
router.get("/shortest/:startStation/:endStation", async (req, res) => {
  const { startStation, endStation } = req.params;

  try {
    // 모든 연결 정보 가져오기
    const snapshot = await db.collection("Connections").get();
    if (snapshot.empty) {
      return res.status(404).send("No connections found");
    }

    // 그래프 데이터를 생성하기 위해 모든 연결을 배열에 추가
    const connections = snapshot.docs.map(doc => doc.data());

    // 다익스트라 알고리즘을 사용해 최단 경로 계산
    const shortestPath = dijkstra.findShortestPath(connections, startStation, endStation);

    if (!shortestPath) {
      return res.status(404).send("No route found between the stations");
    }

    res.status(200).json(shortestPath);
  } catch (error) {
    res.status(500).send("Error fetching shortest route: " + error.message);
  }
});

// 모든 경로 조회 API
router.get("/all", async (req, res) => {
  try {
    const snapshot = await db.collection("Connections").get();
    if (snapshot.empty) {
      return res.status(404).send("No routes found");
    }

    const routes = snapshot.docs.map(doc => doc.data());
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).send("Error fetching routes: " + error.message);
  }
});

module.exports = router;
