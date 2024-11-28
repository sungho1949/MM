// stations.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();

// 역 정보 추가하기
router.post("/add", async (req, res) => {
  const { stationID, stationName, line } = req.body;

  try {
    await db.collection("Stations").doc(stationID).set({
      stationName,
      line,
    });
    res.status(200).send("Station added successfully");
  } catch (error) {
    res.status(500).send("Error adding station: " + error.message);
  }
});

// 두 역 간의 연결 정보 추가하기
router.post("/connect", async (req, res) => {
  const { startStation, endStation, time, distance, cost } = req.body;

  try {
    const connectionData = {
      startStation,
      endStation,
      time,
      distance,
      cost,
    };

    // 연결 정보 저장 (startStation 기준으로 저장)
    await db.collection("Connections").add(connectionData);
    res.status(200).send("Connection added successfully");
  } catch (error) {
    res.status(500).send("Error adding connection: " + error.message);
  }
});

// 특정 역 정보 조회하기
router.get("/:stationID", async (req, res) => {
  const { stationID } = req.params;

  try {
    const stationDoc = await db.collection("Stations").doc(stationID).get();
    if (!stationDoc.exists) {
      return res.status(404).send("Station not found");
    }
    res.status(200).json(stationDoc.data());
  } catch (error) {
    res.status(500).send("Error fetching station: " + error.message);
  }
});

// 두 역 간 경로 조회하기
router.get("/route/:startStation/:endStation", async (req, res) => {
  const { startStation, endStation } = req.params;

  try {
    const snapshot = await db.collection("Connections")
      .where("startStation", "==", startStation)
      .where("endStation", "==", endStation)
      .get();

    if (snapshot.empty) {
      return res.status(404).send("No route found between the stations");
    }

    const routes = snapshot.docs.map(doc => doc.data());
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).send("Error fetching route: " + error.message);
  }
});

module.exports = router;
