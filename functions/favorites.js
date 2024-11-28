// favorites.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();

// 즐겨찾기 추가하기
router.post("/add", async (req, res) => {
  const { userID, routeID } = req.body;

  try {
    await db.collection("Favorites").add({
      userID,
      routeID,
    });
    res.status(200).send("Favorite added successfully");
  } catch (error) {
    res.status(500).send("Error adding favorite: " + error.message);
  }
});

// 사용자 즐겨찾기 조회하기
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const snapshot = await db.collection("Favorites").where("userID", "==", userID).get();
    if (snapshot.empty) {
      return res.status(404).send("No favorites found for the user");
    }

    const favorites = snapshot.docs.map(doc => doc.data());
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).send("Error fetching favorites: " + error.message);
  }
});

// 즐겨찾기 삭제하기
router.delete("/delete/:favoriteID", async (req, res) => {
  const { favoriteID } = req.params;

  try {
    await db.collection("Favorites").doc(favoriteID).delete();
    res.status(200).send("Favorite deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting favorite: " + error.message);
  }
});

module.exports = router;
