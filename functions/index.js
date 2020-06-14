const functions = require('firebase-functions');
const express = require("express");
const firebase = require("./firebase"); 
require('dotenv').config();

//initializing cloud firestore
const admin = require("firebase-admin");
admin.initializeApp();
const app = express();

//creating an instance of firestore
let db = admin.firestore();

//getting tweets from our collection - tweets
app.get("/tweets", (req, res) => {
    db.collection("tweets")
    .orderBy("createdAt", "desc")
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
        createdAt: new Date().toISOString()
    }
    db.collection("tweets")
      .add(newTweet)
      .then( doc => res.json({message : `Tweet with id ${doc.id} created!`}))
      .catch( err => {
          console.error(err);
          return res.status(500).json({ error: "Something went wrong!" })
      })
});

const isEmpty = string => string.trim() === "" ? true : false;
//Signup route for a new user
app.post("/signup", (req, res) => {
    const newUser = {
        "email": req.body.email,
        "password": req.body.password,
        "confirmPassword": req.body.confirmPassword,
        "handle": req.body.handle,
    };
    let errors = {};
    if(isEmpty(newUser.email)){
        errors.email = "Please enter an email id!"
    }else if(){
        
    }
    //TODO: validate data
    let tokenKey;
    let userId;
    db.doc(`/users/${newUser.handle}`).get()
      .then(doc => {
          if(doc.exists){
              return res.status(400).json({handle: "This handle is already in use!"});
          }else{
              return firebase.auth()
              .createUserWithEmailAndPassword(newUser.email, newUser.password);
          }
      }).then(data => {
          userId = data.user.uid;
          return data.user.getIdToken();
      }).then(token => {
          tokenKey = token;
          const userCredentials = {
              "handle": newUser.handle,
              "email": newUser.email,
              "createdAt": new Date().toISOString(),
              userId
          }
          return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      }).then(() => {
          return res.status(201).json({tokenKey})
      }).catch(err => {
                console.error(err);
                if(err.code === "auth/email-already-in-use"){
                    return res.status(400).json({"email": "Email already in use!"});
                }else{
                return res.status(500).json({"error": err.code});
                }
            })
})


exports.api = functions.region("asia-east2").https.onRequest(app);
