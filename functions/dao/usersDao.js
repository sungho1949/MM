// MM/functions/dao/usersDao.js

const admin = require("firebase-admin");
const db = admin.firestore();

// 사용자 등록하기
exports.registerUser = async ({ uid, email }) => {
  try {
    await db.collection("Users").doc(uid).set({
      email,
      createdAt: new Date().toISOString(),
    });
    return "User registered successfully";
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

// 사용자 정보 조회하기
exports.getUserProfile = async (uid) => {
  try {
    const userDoc = await db.collection("Users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return userDoc.data();
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
};

// 사용자 사용 기록 업데이트하기
exports.updateUsageHistory = async (userId, startStation, endStation) => {
  try {
    const usageRef = db.collection("UsageHistory").doc(`${userId}_${startStation}_${endStation}`);
    const usageDoc = await usageRef.get();

    if (usageDoc.exists) {
      const usageData = usageDoc.data();
      const newCount = usageData.count + 1;
      await usageRef.update({ count: newCount });
    } else {
      await usageRef.set({ userId, startStation, endStation, count: 1 });
    }
  } catch (error) {
    throw new Error(`Error updating usage history: ${error.message}`);
  }
};
