// MM/functions/controllers/usersController.js

const usersService = require("../services/usersService");

// 사용자 등록하기
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const result = await usersService.registerUser({ email, password });
    res.status(200).send(result);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send(`Error registering user: ${error.message}`);
  }
};

// 사용자 로그인 처리
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    const result = await usersService.loginUser({ email, password });
    res.status(200).send(result);
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).send(`Error logging in user: ${error.message}`);
  }
};

// 사용자 정보 조회하기
exports.getProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(400).send("User ID is required");
    }
    const result = await usersService.getUserProfile(uid);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).send(`Error fetching user profile: ${error.message}`);
  }
};
