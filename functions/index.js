const functions = require('firebase-functions');
//initializing cloud firestore
const admin = require("firebase-admin");
admin.initializeApp();

//creating an instance of firestore
let db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello Firebase!");
});

//getting tweets from our collection - tweets
exports.getTweets = functions.https.onRequest((req, res) => {
    db.collection("tweets")
      .get()
      .then( docs => {
          let tweets = [];
          docs.forEach((doc) => {
              tweets.push(doc.data());
          });
          return res.json(tweets);
      }).catch(err => {
          console.error(err);
      })
})

//create a tweet object
exports.createTweet = functions.https.onRequest((req, res) => {
    if(req.method !== "POST"){
        return res.status(400).json({error: "Method not allowed."});
    }
    const newTweet = {
        handle: req.body.handle,
        content: req.body.content,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    }
    db.collection("tweets")
      .add(newTweet)
      .then( doc => res.json({message : `Tweet with id ${doc.id} created!`}))
      .catch( err => {
          console.error(err);
          return res.status(500).json({ error: "Something went wrong!" })
      })
})
