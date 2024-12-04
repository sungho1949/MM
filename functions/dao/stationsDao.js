// MM/functions/dao/stationsDao.js

const admin = require("firebase-admin");
const db = admin.firestore();

// 역 정보 추가하기
exports.addStation = async ({ stationID, stationName, line }) => {
  try {
    await db.collection("Stations").doc(stationID).set({
      stationName,
      line,
    });
    return "Station added successfully";
  } catch (error) {
    throw new Error(`Error adding station: ${error.message}`);
  }
};

// 두 역 간의 연결 정보 추가하기
exports.connectStations = async ({ startStation, endStation, time, distance, cost }) => {
  try {
    await db.collection("Connections").add({
      startStation,
      endStation,
      time,
      distance,
      cost,
    });
    return "Connection added successfully";
  } catch (error) {
    throw new Error(`Error adding connection: ${error.message}`);
  }
};

// 특정 역 정보 조회하기
exports.getStationInfo = async (stationID) => {
  try {
    const stationDoc = await db.collection("Stations").doc(stationID).get();
    if (!stationDoc.exists) {
      throw new Error("Station not found");
    }
    return stationDoc.data();
  } catch (error) {
    throw new Error(`Error fetching station: ${error.message}`);
  }
};

// 두 역 간 경로 조회하기
exports.getRoute = async (startStation, endStation) => {
  try {
    const snapshot = await db.collection("Connections")
      .where("startStation", "==", startStation)
      .where("endStation", "==", endStation)
      .get();

    if (snapshot.empty) {
      throw new Error("No route found between the stations");
    }

    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw new Error(`Error fetching route: ${error.message}`);
  }
};
