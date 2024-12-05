const Graph = require("../utils/dijkstra");
const { db } = require("../firebaseConfig");

// 최적 경로 계산
exports.getOptimalRoute = async (startStation, endStation, criteria) => {
  try {
    const graph = new Graph();

    // Firestore에서 모든 연결 정보 가져오기
    const snapshot = await db.collection("Connections").get();

    if (snapshot.empty) {
      throw new Error("No connections found");
    }

    // 그래프 데이터 구성
    snapshot.docs.forEach(doc => {
      const { startStation, endStation, time, distance, cost } = doc.data();
      graph.addEdge(startStation, endStation, time, distance, cost);
    });

    // 다익스트라 알고리즘으로 최적 경로 계산
    const optimalRoute = graph.findShortestPath(startStation, endStation, criteria);

    if (!optimalRoute) {
      throw new Error("No optimal route found");
    }

    return optimalRoute;
  } catch (error) {
    throw new Error(`Error calculating optimal route: ${error.message}`);
  }
};

// 사용자가 선택한 경로를 Firestore에 저장
exports.storeUserSelectedRoute = async (userId, selectedRoute) => {
  try {
    await db.collection("UserSelectedRoutes").doc(userId).set({
      selectedRoute,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    throw new Error(`Error storing user selected route: ${error.message}`);
  }
};

// 사용자에게 경로 안내 및 알림 제공
exports.provideRouteGuidance = async (userId, selectedRoute) => {
  try {
    // 예시: Firebase Cloud Messaging을 사용한 알림
    const messaging = require("../firebaseConfig").messaging;
    
    // 경로의 모든 역을 순회하며 알림을 제공하거나, 환승 전역, 도착 전역에서만 알림 제공 가능
    for (let i = 0; i < selectedRoute.path.length - 1; i++) {
      const currentStation = selectedRoute.path[i];
      const nextStation = selectedRoute.path[i + 1];

      // 환승 정보가 있을 경우 알림 추가
      const isTransfer = selectedRoute.transfers && selectedRoute.transfers.includes(currentStation);

      const message = {
        notification: {
          title: "경로 안내",
          body: isTransfer ? 
            `다음 역에서 환승합니다: ${nextStation}` : 
            `다음 역: ${nextStation}`
        },
        token: await getUserFCMToken(userId) // 사용자의 FCM 토큰을 가져오는 함수
      };

      await messaging.send(message);
    }

    // 도착 전 알림
    const finalStation = selectedRoute.path[selectedRoute.path.length - 1];
    const finalMessage = {
      notification: {
        title: "도착 안내",
        body: `곧 도착합니다: ${finalStation}`
      },
      token: await getUserFCMToken(userId)
    };

    await messaging.send(finalMessage);
  } catch (error) {
    throw new Error(`Error providing route guidance: ${error.message}`);
  }
};

// 사용자 FCM 토큰을 가져오는 함수
const getUserFCMToken = async (userId) => {
  try {
    const userDoc = await db.collection("Users").doc(userId).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return userDoc.data().fcmToken; // 유저의 FCM 토큰 반환
  } catch (error) {
    throw new Error(`Error fetching user FCM token: ${error.message}`);
  }
};
