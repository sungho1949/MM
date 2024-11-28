// users.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Firebase Admin 초기화
// 이 부분은 index.js에서 이미 초기화되었으므로 중복으로 하지 않도록 주의

// 사용자 등록 API
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Authentication을 사용해 사용자 생성
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(200).send(`User created with ID: ${userRecord.uid}`);
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
});

// 사용자 로그인 API (Firebase Auth는 보통 클라이언트에서 로그인 처리)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Firebase Authentication에서는 서버 측에서 직접 비밀번호 인증을 제공하지 않음
    // 실제 로그인은 클라이언트에서 처리하고, 여기서는 사용자 정보 조회나 토큰 검증 등을 할 수 있음
    const user = await admin.auth().getUserByEmail(email);
    res.status(200).send(`Logged in as: ${user.uid}`);
  } catch (error) {
    res.status(500).send(`Error logging in: ${error.message}`);
  }
});

// 사용자 정보 조회 API
router.get("/profile/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const userRecord = await admin.auth().getUser(uid);
    res.status(200).json(userRecord);
  } catch (error) {
    res.status(500).send(`Error fetching user data: ${error.message}`);
  }
});

module.exports = router;
