const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../firebaseKey.json")),
    databaseURL: "https://metro-map-5f2e7-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

const db = admin.firestore();

module.exports = { db };
