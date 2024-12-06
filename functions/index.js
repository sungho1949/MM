const functions = require("firebase-functions");
const express = require("express");
const app = express();

// Firebase Admin 초기화
const admin = require("firebase-admin");
const serviceAccount = require('../firebaseKey.json');

if (!admin.apps || !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://metro-map-5f2e7-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

// 미들웨어 설정
app.use(express.json());

// 라우트 설정
const routes = require("./routes");
app.use("/api", routes); // "/api"로 시작하는 모든 요청을 routes로 연결

// Firebase Functions 내보내기
exports.api = functions.https.onRequest(app);

// Express 앱 내보내기 (테스트 용도)
module.exports = { app };
