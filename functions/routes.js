// MM/functions/routes.js

// MM/functions/routes.js

const express = require("express");
const router = express.Router();

// 컨트롤러 불러오기
const stationsController = require("../controllers/stationsController");
const usersController = require("../controllers/usersController");
const routesController = require("../controllers/routesController");

// 역 관련 라우트
router.post("/stations/add", stationsController.addStation);
router.post("/stations/connect", stationsController.connectStations);
router.get("/stations/:stationID", stationsController.getStationInfo);
router.get("/stations/route/:startStation/:endStation", stationsController.getRoute);

// 사용자 관련 라우트
router.post("/users/register", usersController.register);
router.post("/users/login", usersController.login);
router.get("/users/profile/:uid", usersController.getProfile);

// 경로 관련 라우트
router.post("/routes/search", routesController.searchRoutes);

module.exports = router;
