// MM/functions/services/routesService.js

const routesDao = require("../dao/routesDao");
const Graph = require("../utils/dijkstra");

// 경로 계산 및 사용자에게 선택지 제공
exports.searchRoutes = async ({ userId, startStation, endStation }) => {
  try {
    if (!userId || !startStation || !endStation) {
      throw new Error("User ID, start station, and end station are required");
    }

    // 그래프 객체 생성
    const graph = new Graph();

    // 모든 역과 연결 정보 가져오기
    const stations = await routesDao.getAllStations();
    const connections = await routesDao.getAllConnections();

    if (!stations.length || !connections.length) {
      throw new Error("No stations or connections found");
    }

    // 역 추가
    stations.forEach(station => {
      graph.addNode(station.id);
    });

    // 연결 정보 추가
    connections.forEach(connection => {
      const { startStation, endStation, time, distance, cost } = connection;
      graph.addEdge(startStation, endStation, time, distance, cost);
    });

    // 최소 시간, 최단 거리, 최소 비용 경로 계산
    const shortestTimePath = graph.findShortestPath(startStation, endStation, "time");
    const shortestDistancePath = graph.findShortestPath(startStation, endStation, "distance");
    const lowestCostPath = graph.findShortestPath(startStation, endStation, "cost");

    // 사용자 사용 기록 업데이트
    await routesDao.updateUsageHistory(userId, startStation, endStation);

    // 사용자에게 경로 제공
    return [
      {
        criteria: "time",
        path: shortestTimePath.path,
        distance: shortestTimePath.distance,
      },
      {
        criteria: "distance",
        path: shortestDistancePath.path,
        distance: shortestDistancePath.distance,
      },
      {
        criteria: "cost",
        path: lowestCostPath.path,
        distance: lowestCostPath.distance,
      },
    ];
  } catch (error) {
    throw new Error(`Error searching routes: ${error.message}`);
  }
};
