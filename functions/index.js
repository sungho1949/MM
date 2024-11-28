// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

// Firebase Admin 초기화
admin.initializeApp();
const db = admin.firestore();

// 라우트 파일 불러오기
const routes = require("./routes");
const stations = require("./stations");
const users = require("./users");
const favorites = require("./favorites");

// 라우터 연결
app.use("/api/routes", routes);
app.use("/api/stations", stations);
app.use("/api/users", users);
app.use("/api/favorites", favorites);

// Firebase Function Export (v1 방식 사용)
exports.api = functions.https.onRequest(app);
