const functions = require("firebase-functions");
const express = require("express");
const { getTweets, createTweet } = require("./routes/tweets");
const { signup, login, uploadImage } = require("./routes/users");
const FBAuth = require("./routes/middleware");

const app = express();

//get all tweets
app.get("/tweets", getTweets);

//create a tweet object
app.post("/tweet", FBAuth, createTweet);

//Signup route for a new user
app.post("/signup", signup);

//Login route
app.post("/login", login);
//upload an image
app.post("/user/image", FBAuth, uploadImage);

exports.api = functions.region("asia-east2").https.onRequest(app);
