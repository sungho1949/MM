// MM/functions/services/stationsService.js

const stationsDao = require("../dao/stationsDao");

// 역 정보 추가하기
exports.addStation = async ({ stationID, stationName, line }) => {
  try {
    if (!stationID || !stationName || !line) {
      throw new Error("Missing station information");
    }
    return await stationsDao.addStation({ stationID, stationName, line });
  } catch (error) {
    throw new Error(`Error adding station: ${error.message}`);
  }
};

// 두 역 간 연결 정보 추가하기
exports.connectStations = async ({ startStation, endStation, time, distance, cost }) => {
  try {
    if (!startStation || !endStation || !time || !distance || !cost) {
      throw new Error("Missing connection information");
    }
    return await stationsDao.connectStations({ startStation, endStation, time, distance, cost });
  } catch (error) {
    throw new Error(`Error adding connection: ${error.message}`);
  }
};

// 특정 역 정보 조회하기
exports.getStationInfo = async (stationID) => {
  try {
    if (!stationID) {
      throw new Error("Missing station ID");
    }
    return await stationsDao.getStationInfo(stationID);
  } catch (error) {
    throw new Error(`Error fetching station: ${error.message}`);
  }
};

// 두 역 간 경로 조회하기
exports.getRoute = async (startStation, endStation) => {
  try {
    if (!startStation || !endStation) {
      throw new Error("Missing station information");
    }
    return await stationsDao.getRoute(startStation, endStation);
  } catch (error) {
    throw new Error(`Error fetching route: ${error.message}`);
  }
};
