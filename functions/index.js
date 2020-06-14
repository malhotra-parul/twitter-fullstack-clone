const functions = require('firebase-functions');
const express = require("express");
//initializing cloud firestore
const admin = require("firebase-admin");
admin.initializeApp();
const app = express();

//creating an instance of firestore
let db = admin.firestore();

//getting tweets from our collection - tweets
app.get("/tweets", (req, res) => {
    db.collection("tweets")
    .get()
    .then( docs => {
        let tweets = [];
        docs.forEach((doc) => {
            tweets.push({
                tweetId: doc.id,
                tweetHandle: doc.data().handle,
                tweetContent: doc.data().content,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(tweets);
    }).catch(err => {
        console.error(err);
    })
});

//create a tweet object
app.post("/tweet", (req, res) => {
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
});


exports.api = functions.https.onRequest(app);
