// MM/functions/services/usersService.js

const routesService = require("../services/routesService");

// 경로 계산 및 사용자에게 선택지 제공
exports.searchRoutes = async (req, res) => {
  try {
    const { userId, startStation, endStation } = req.body;
    if (!userId || !startStation || !endStation) {
      return res.status(400).send("User ID, start station, and end station are required");
    }
    const result = await routesService.searchRoutes({ userId, startStation, endStation });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error searching routes:", error.message);
    res.status(500).send(`Error searching routes: ${error.message}`);
  }
};
