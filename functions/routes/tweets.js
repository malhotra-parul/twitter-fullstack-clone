const { db } = require("../utils/admin");

//get all tweets
exports.getTweets = (req, res) => {
  db.collection("tweets")
    .orderBy("createdAt", "desc")
    .get()
    .then((docs) => {
      let tweets = [];
      docs.forEach((doc) => {
        tweets.push({
          tweetId: doc.id,
          tweetHandle: doc.data().handle,
          tweetContent: doc.data().content,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(tweets);
    })
    .catch((err) => {
      console.error(err);
    });
};

//add a tweet
exports.createTweet = (req, res) => {
  const newTweet = {
    handle: req.user.handle,
    content: req.body.content,
    createdAt: new Date().toISOString(),
  };
  db.collection("tweets")
    .add(newTweet)
    .then((doc) => res.json({ message: `Tweet with id ${doc.id} created!` }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong!" });
    });
};

exports.getTweet = (req, res) => {
  let tweetData = {};
  db.doc(`/tweets/${req.params.tweetId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Tweet does not exist!" });
      }
      tweetData = doc.data();
      tweetData.tweetId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("tweetId", "==", req.params.tweetId)
        .get();
    })
    .then((data) => {
      tweetData.comments = [];

      data.forEach((doc) => {
        tweetData.comments.push(doc.data());
      });
      return res.json(tweetData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
