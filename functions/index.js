const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { db } = require("./utils/admin");

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
  markNotificationsRead
} = require("./routes/users");
const FBAuth = require("./routes/middleware");

const app = express();
app.use(cors());
/* User routes */

app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getOwnUserData);
app.get("/user/:handle", getDetailsOfAnyUser);
app.post("/notifications", FBAuth, markNotificationsRead);

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
   
   return db.doc(`/tweets/${snapshot.data().tweetId}`).get()
      .then(doc => {
        if(doc.exists && doc.data().handle !== snapshot.data().likedBy){
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
      }).catch(err => console.error(err))
  } );

  exports.createNotificationOnComment = functions
  .region('asia-east2')
  .firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    return db.doc(`/tweets/${snapshot.data().tweetId}`).get()
      .then(doc => {
        if(doc.exists && doc.data().handle !== snapshot.data().commentBy){
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
      }).catch(err => console.error(err))
  });

  exports.deleteNotificationOnLike = functions
  .region('asia-east2')
  .firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
   return db.doc(`/notifications/${snapshot.id}`)
     .delete()
     .catch(err => console.error(err))
})

//db trigger for when user changes his profile picture
exports.onUserImageChange = functions
.region('asia-east2')
.firestore
.document('users/{userHandle}')
.onUpdate((change, context) => {
  let batch = db.batch();
  if(change.before.data().imageUrl !== change.after.data().imageUrl){
  return db.collection("tweets").where("handle", "==", change.before.data().handle).get()
      .then(data => {
        data.forEach(doc => {
          let tweet = db.doc(`/tweets/${doc.id}`);
          batch.update(tweet, {imageUrl: change.after.data().imageUrl})
        })
        return batch.commit();
      }).catch(err => console.error(err));
    }else{
      return null;
    }
});

//deleting a tweet must also delete enteries in likes, comments and notifications for
// the deleted tweet
exports.deleteTweet = functions.region('asia-east2')
.firestore
.document('tweets/{tweetId}')
.onDelete((snapshot, context) => {
  let batch = db.batch();
  return db.collection('likes').where('tweetId', '==', context.params.tweetId).get()
            .then(data => {
              data.forEach(doc => {
                batch.delete(db.doc(`/likes/${doc.id}`));
              })
              return db.collection('comments').where('tweetId', '==', context.params.tweetId).get()})
              .then(data => {
                data.forEach(doc => {
                  batch.delete(db.doc(`/comments/${doc.id}`));
                })
                return db.collection('notifications').where('tweetId', '==', context.params.tweetId).get() })
                .then(data => {
                  data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                  })
                  return batch.commit();
            }).catch(err => console.error(err))
})