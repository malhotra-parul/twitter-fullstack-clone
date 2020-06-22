const functions = require("firebase-functions");
const { db } = require("./utils/admin");
const express = require("express");
const {
  getTweets,
  createTweet,
  getTweet,
  commentOnTweet,
  likeTweet,
  unlikeTweet,
  deleteTweet,
} = require("./routes/tweets");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getOwnUserData,
  getDetailsOfAnyUser,
  // markNotificationsRead
} = require("./routes/users");
const FBAuth = require("./routes/middleware");

const app = express();
/* User routes */

app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getOwnUserData);
app.get("/user/:handle", getDetailsOfAnyUser);
// app.post("/notifications", FBAuth, markNotificationsRead);

/* Tweet Routes */
app.get("/tweets", getTweets);
app.post("/tweet", FBAuth, createTweet);
app.get("/tweet/:tweetId", getTweet);
app.delete("/tweet/:tweetId", FBAuth, deleteTweet);
app.get("/tweet/:tweetId/like", FBAuth, likeTweet);
app.get("/tweet/:tweetId/unlike", FBAuth, unlikeTweet);
app.post("/tweet/:tweetId/comment", FBAuth, commentOnTweet);

exports.api = functions.region("asia-east2").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("asia-east2")
  .firestore.document("likes/{id}")
  .onCreate(( snapshot, context )=> {
    console.log('snapshot data property -> ', snapshot.data());
    db.doc(`/tweets/${snapshot.data().tweetId}`).get()
      .then(doc => {
        if(doc.exists){
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().handle,
            sender: snapshot.data().likedBy,
            type: 'like',
            read: false,
            tweetId: doc.id
          })
        }else{
          return null;
        }
      }).then(() => {
        return;
      }).catch(err => {
        console.error(err);
        return;
      })
  } );

  exports.createNotificationOnComment = functions
  .region('asia-east2')
  .firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    db.doc(`/tweets/${snapshot.data().tweetId}`).get()
      .then(doc => {
        if(doc.exists){
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().handle,
            sender: snapshot.data().commentBy,
            type: 'comment',
            read: false,
            tweetId: doc.id
          })
        }else{
          return null;
        }
      }).then(()=>{
        return;
      }).catch(err => {
        console.error(err);
        return;
      })
  });

  exports.deleteNotificationOnLike = functions
  .region('asia-east2')
  .firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
   db.doc(`/notifications/${snapshot.id}`)
     .delete()
     .then(() => {
    return;
  }).catch(err => {
    console.error(err);
    return;
  })
})
