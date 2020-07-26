const admin  = require("firebase-admin");
const serviceAccount = require("../twitter-ee105-firebase-adminsdk-8pobm-fa5e847018.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twitter-ee105.firebaseio.com"
  });


const db = admin.firestore();

module.exports = { admin, db };