const routesService = require("../services/routesService");

// 최적 경로 검색
exports.searchOptimalRoute = async (req, res) => {
  try {
    const { startStation, endStation, criteria } = req.body;

    if (!startStation || !endStation || !criteria) {
      return res.status(400).send("Missing required information");
    }

    const result = await routesService.getOptimalRoute(startStation, endStation, criteria);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error searching optimal route:", error.message);
    res.status(500).send(`Error searching optimal route: ${error.message}`);
  }
};

// 사용자가 선택한 최적 경로를 처리하는 함수
exports.selectOptimalRoute = async (req, res) => {
  try {
    const { userId, selectedRoute } = req.body;

    if (!userId || !selectedRoute) {
      return res.status(400).send("User ID and selected route are required");
    }

    // 사용자 선택에 따른 경로 저장
    await routesService.storeUserSelectedRoute(userId, selectedRoute);

    // 경로 안내와 알림 제공
    await routesService.provideRouteGuidance(userId, selectedRoute);

    res.status(200).send("Route selection successful, guidance initiated");
  } catch (error) {
    console.error("Error processing selected route:", error.message);
    res.status(500).send(`Error processing selected route: ${error.message}`);
  }
};
