const admin = require("firebase-admin");
const serviceAccount = require("../firebaseKey.json"); // Firebase 서비스 계정 키 JSON 파일

// Firebase 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // 키 인증
    databaseURL: "http://127.0.0.1:8080", // Firestore Emulator 주소
  });
}

const db = admin.firestore();

// Firestore Emulator 설정
db.settings({
  host: "127.0.0.1:8080",
  ssl: false,
});

module.exports = { db };
