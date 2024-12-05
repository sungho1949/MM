const express = require("express");
const router = express.Router();

// 컨트롤러 불러오기
const stationsController = require("./controllers/stationsController");
const routesController = require("./controllers/routesController");

// 역 관련 라우트
router.get("/stations/:stationID", stationsController.getStationInfo); // 특정 역 정보 조회
router.get("/stations/route/:startStation/:endStation", stationsController.getRoute); // 두 역 간 경로 조회

// 경로 관련 라우트
router.post("/routes/searchOptimalRoute", routesController.searchOptimalRoute); // 최적 경로 검색
router.post("/routes/selectOptimalRoute", routesController.selectOptimalRoute); // 선택된 경로를 처리하는 새로운 API 엔드포인트 추가

module.exports = router;
