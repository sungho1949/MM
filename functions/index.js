const express = require("express");
const cors = require("cors");
const app = express();
const { db } = require("./firebaseConfig"); // Firebase Firestore 연결

app.use(cors()); // React Native에서의 CORS 문제 해결
app.use(express.json());

// API 라우트 예제
app.get("/api/stations", async (req, res) => {
  try {
    const stationsSnapshot = await db.collection("Stations").get();
    const stations = stationsSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stations" });
  }
});

// 서버 실행
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://127.0.0.1:${PORT}`);
});
