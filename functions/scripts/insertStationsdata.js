// MM/functions/scripts/insertStationsData.js

const admin = require("firebase-admin");

// Firebase Admin 초기화 (초기화된 앱이 없을 경우에만 초기화)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("../../firebaseKey.json")),
        databaseURL: "https://metro-map-5f2e7-default-rtdb.asia-southeast1.firebasedatabase.app",
    });
}

const db = admin.firestore();

async function insertStationsData() {
    try {
        // 역 데이터 정의
        const stationsData = [
            { stationID: "101", stationName: "101" },
            { stationID: "102", stationName: "102" },
            { stationID: "103", stationName: "103" },
            { stationID: "104", stationName: "104" },
            { stationID: "105", stationName: "105" },
            { stationID: "106", stationName: "106" },
            { stationID: "107", stationName: "107" },
            { stationID: "108", stationName: "108" },
            { stationID: "109", stationName: "109" },
            { stationID: "110", stationName: "110" },
            { stationID: "111", stationName: "111" },
            { stationID: "112", stationName: "112" },
            { stationID: "113", stationName: "113" },
            { stationID: "114", stationName: "114" },
            { stationID: "115", stationName: "115" },
            { stationID: "116", stationName: "116" },
            { stationID: "117", stationName: "117" },
            { stationID: "118", stationName: "118" },
            { stationID: "119", stationName: "119" },
            { stationID: "120", stationName: "120" },
            { stationID: "121", stationName: "121" },
            { stationID: "122", stationName: "122" },
            { stationID: "123", stationName: "123" },
            { stationID: "201", stationName: "201" },
            { stationID: "202", stationName: "202" },
            { stationID: "203", stationName: "203" },
            { stationID: "204", stationName: "204" },
            { stationID: "205", stationName: "205" },
            { stationID: "206", stationName: "206" },
            { stationID: "207", stationName: "207" },
            { stationID: "208", stationName: "208" },
            { stationID: "209", stationName: "209" },
            { stationID: "210", stationName: "210" },
            { stationID: "211", stationName: "211" },
            { stationID: "212", stationName: "212" },
            { stationID: "213", stationName: "213" },
            { stationID: "214", stationName: "214" },
            { stationID: "215", stationName: "215" },
            { stationID: "216", stationName: "216" },
            { stationID: "217", stationName: "217" },
            { stationID: "301", stationName: "301" },
            { stationID: "302", stationName: "302" },
            { stationID: "303", stationName: "303" },
            { stationID: "304", stationName: "304" },
            { stationID: "305", stationName: "305" },
            { stationID: "306", stationName: "306" },
            { stationID: "307", stationName: "307" },
            { stationID: "308", stationName: "308" },
            { stationID: "401", stationName: "401" },
            { stationID: "402", stationName: "402" },
            { stationID: "403", stationName: "403" },
            { stationID: "404", stationName: "404" },
            { stationID: "405", stationName: "405" },
            { stationID: "406", stationName: "406" },
            { stationID: "407", stationName: "407" },
            { stationID: "408", stationName: "408" },
            { stationID: "409", stationName: "409" },
            { stationID: "410", stationName: "410" },
            { stationID: "411", stationName: "411" },
            { stationID: "412", stationName: "412" },
            { stationID: "413", stationName: "413" },
            { stationID: "414", stationName: "414" },
            { stationID: "415", stationName: "415" },
            { stationID: "416", stationName: "416" },
            { stationID: "417", stationName: "417" },
            { stationID: "501", stationName: "501" },
            { stationID: "502", stationName: "502" },
            { stationID: "503", stationName: "503" },
            { stationID: "504", stationName: "504" },
            { stationID: "505", stationName: "505" },
            { stationID: "506", stationName: "506" },
            { stationID: "507", stationName: "507" },
            { stationID: "601", stationName: "601" },
            { stationID: "602", stationName: "602" },
            { stationID: "603", stationName: "603" },
            { stationID: "604", stationName: "604" },
            { stationID: "605", stationName: "605" },
            { stationID: "606", stationName: "606" },
            { stationID: "607", stationName: "607" },
            { stationID: "608", stationName: "608" },
            { stationID: "609", stationName: "609" },
            { stationID: "610", stationName: "610" },
            { stationID: "611", stationName: "611" },
            { stationID: "612", stationName: "612" },
            { stationID: "613", stationName: "613" },
            { stationID: "614", stationName: "614" },
            { stationID: "615", stationName: "615" },
            { stationID: "616", stationName: "616" },
            { stationID: "617", stationName: "617" },
            { stationID: "618", stationName: "618" },
            { stationID: "619", stationName: "619" },
            { stationID: "620", stationName: "620" },
            { stationID: "621", stationName: "621" },
            { stationID: "622", stationName: "622" },
            { stationID: "701", stationName: "701" },
            { stationID: "702", stationName: "702" },
            { stationID: "703", stationName: "703" },
            { stationID: "704", stationName: "704" },
            { stationID: "705", stationName: "705" },
            { stationID: "706", stationName: "706" },
            { stationID: "707", stationName: "707" },
            { stationID: "801", stationName: "801" },
            { stationID: "802", stationName: "802" },
            { stationID: "803", stationName: "803" },
            { stationID: "804", stationName: "804" },
            { stationID: "805", stationName: "805" },
            { stationID: "806", stationName: "806" },
            { stationID: "901", stationName: "901" },
            { stationID: "902", stationName: "902" },
            { stationID: "903", stationName: "903" },
            { stationID: "904", stationName: "904" },
        ];
        
        

        // Firestore에 역 정보 삽입
        for (const station of stationsData) {
            const { stationID, stationName } = station;

            // 역 정보 Firestore에 저장
            await db.collection("Stations").doc(stationID).set({
                stationID,
                stationName,
            });

            console.log(`Station ${stationID} added successfully`);
        }

        console.log("All station data inserted successfully");

    } catch (error) {
        console.error("Error inserting station data:", error);
    }
}

// 데이터베이스에 삽입 함수 실행
insertStationsData();
