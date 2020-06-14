const admin  = require("firebase-admin");
const serviceAccount = require("../twitter-ee105-firebase-adminsdk-8pobm-5cf80ce50d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twitter-ee105.firebaseio.com"
  });

const db = admin.firestore();

module.exports = { admin, db };