// MM/functions/controllers/stationsController.js

const stationsService = require("../services/stationsService");

// 역 정보 추가하기
exports.addStation = async (req, res) => {
  try {
    const { stationID, stationName, line } = req.body;
    if (!stationID || !stationName || !line) {
      return res.status(400).send("Missing station information");
    }
    const result = await stationsService.addStation({ stationID, stationName, line });
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding station:", error.message);
    res.status(500).send(`Error adding station: ${error.message}`);
  }
};

// 두 역 간 연결 정보 추가하기
exports.connectStations = async (req, res) => {
  try {
    const { startStation, endStation, time, distance, cost } = req.body;
    if (!startStation || !endStation || !time || !distance || !cost) {
      return res.status(400).send("Missing connection information");
    }
    const result = await stationsService.connectStations({ startStation, endStation, time, distance, cost });
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding connection:", error.message);
    res.status(500).send(`Error adding connection: ${error.message}`);
  }
};

// 특정 역 정보 조회하기
exports.getStationInfo = async (req, res) => {
  try {
    const { stationID } = req.params;
    if (!stationID) {
      return res.status(400).send("Missing station ID");
    }
    const result = await stationsService.getStationInfo(stationID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching station:", error.message);
    res.status(500).send(`Error fetching station: ${error.message}`);
  }
};

// 두 역 간 경로 조회하기
exports.getRoute = async (req, res) => {
  try {
    const { startStation, endStation } = req.params;
    if (!startStation || !endStation) {
      return res.status(400).send("Missing station information");
    }
    const result = await stationsService.getRoute(startStation, endStation);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching route:", error.message);
    res.status(500).send(`Error fetching route: ${error.message}`);
  }
};
