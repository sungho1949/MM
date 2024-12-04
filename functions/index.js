// MM/functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

// Firebase Admin 초기화 (프로젝트 전체에서 한 번만 수행)
if (!admin.apps.length) {
    admin.initializeApp();
}

// 컨트롤러 불러오기
const stationsController = require("./controllers/stationsController");
const usersController = require("./controllers/usersController");
const routesController = require("./controllers/routesController");

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
app.post("/api/stations/add", stationsController.addStation);
app.post("/api/stations/connect", stationsController.connectStations);
app.get("/api/stations/:stationID", stationsController.getStationInfo);
app.get("/api/stations/route/:startStation/:endStation", stationsController.getRoute);

app.post("/api/users/register", usersController.register);
app.post("/api/users/login", usersController.login);
app.get("/api/users/profile/:uid", usersController.getProfile);

app.post("/api/routes/searchRoutes", routesController.searchRoutes);

// Firebase Function Export
exports.api = functions.https.onRequest(app);
