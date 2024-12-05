const functions = require("firebase-functions");
const express = require("express");
const app = express();

// Firebase Admin 초기화
const admin = require("firebase-admin");
if (!admin.apps.length) {
  admin.initializeApp();
}

// 미들웨어 설정
app.use(express.json());

// 통합된 라우트 불러오기
const path = require("path");
const routes = require(path.resolve(__dirname, "routes"));

// 라우트 설정
app.use("/api", routes); // "/api"로 시작하는 모든 요청을 routes로 연결

// Firebase Functions 내보내기
exports.api = functions.https.onRequest(app);
