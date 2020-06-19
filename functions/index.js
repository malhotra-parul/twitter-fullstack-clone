const functions = require("firebase-functions");
const express = require("express");
const { getTweets, createTweet, getTweet, commentOnTweet } = require("./routes/tweets");
const { signup, login, uploadImage, addUserDetails, getOwnUserData } = require("./routes/users");
const FBAuth = require("./routes/middleware");

const app = express();
/* User routes */
//Signup route for a new user
app.post("/signup", signup);
//Login route
app.post("/login", login);
//upload an image
app.post("/user/image", FBAuth, uploadImage);
//add profile details on user
app.post("/user", FBAuth, addUserDetails);
//get authenticated user data
app.get("/user", FBAuth, getOwnUserData);

/* Tweet Routes */
//get all tweets
app.get("/tweets", getTweets);
//create a tweet object
app.post("/tweet", FBAuth, createTweet);
//get one tweet details
app.get("/tweet/:tweetId", getTweet);
//Todo: Delete Tweet
//Todo: Like a Tweet
//Todo: Unlike a tweet
//Comment on a tweet
app.post("/tweet/:tweetId/comment", FBAuth, commentOnTweet);

exports.api = functions.region("asia-east2").https.onRequest(app);
