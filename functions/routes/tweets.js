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
    likeCount: 0,
    commentCount: 0,
    imageUrl: req.user.imageUrl
  };
  db.collection("tweets")
    .add(newTweet)
    .then((doc) => {
      const responseTweet = newTweet;
      responseTweet.tweetId = doc.id;
      return res.json( responseTweet );
    })
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

//create a comment on a tweet
exports.commentOnTweet = (req, res) => {
  if(req.body.content.trim() === "") return res.status(400).json({ error: "Must not be empty!" });
  const newComment = {
    content: req.body.content,
    createdAt: new Date().toISOString(),
    tweetId: req.params.tweetId,
    commentBy: req.user.handle,
    imageUrl: req.user.imageUrl
  }
  //now check if the tweetId exists or not
  db.doc(`/tweets/${req.params.tweetId}`).get()
    .then(doc => {
      if(!doc.exists) return res.status(404).json({error: "Tweet not found!"});
      console.log(doc.ref);
      return doc.ref.update({ commentCount: doc.data().commentCount + 1})
    }).then(() =>  db.collection("comments").add(newComment))
      .then(() => {
      return res.json(newComment);
    }).catch( err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    })
} 

exports.likeTweet = (req, res) => {
  //edge cases - check if likeDocument already exists. If it does, throw and error 
  //informing user that he has already liked it.
  //second check would be for tweetId, if it exists or not.
  const likeDocument = db.collection("likes")
                         .where("likedBy", "==", req.user.handle)
                         .where("tweetId", "==", req.params.tweetId)
                         .limit(1);
  let tweetData;
  const tweetDocument =  db.doc(`/tweets/${req.params.tweetId}`);
  tweetDocument.get()
    .then(doc => {
      if(doc.exists){
        tweetData = doc.data();
        return likeDocument.get();
        } else{
        return res.status(404).json({error: "Tweet not found!"});
      }
    }).then( data => {
      if(data.empty){
        return db.collection("likes").add({
          tweetId: req.params.tweetId,
          likedBy: req.user.handle
        })}else{
          return res.status(400).json({error: "Tweet is already liked!"});
        }
      }).then( () => {
          tweetData.likeCount++;
          return tweetDocument.update({ likeCount: tweetData.likeCount});
        }).then(() => {
          return res.json(tweetData);
        }).catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    })
};

exports.unlikeTweet = (req, res) => {
  const likeDocument = db.collection("likes")
                         .where("likedBy", "==", req.user.handle)
                         .where("tweetId", "==", req.params.tweetId)
                         .limit(1);
  let tweetData;
  const tweetDocument =  db.doc(`/tweets/${req.params.tweetId}`);

  tweetDocument.get()
    .then(doc => {
      if(doc.exists){
        tweetData = doc.data();
        return likeDocument.get();
        } else{
        return res.status(404).json({error: "Tweet not found!"});
      }
    }).then( data => {
      if(data.empty){
        return res.status(400).json({error: "Tweet is not liked!"});
      }else{
       return db.doc(`/likes/${data.docs[0].id}`).delete()
      }}).then( () => {
           tweetData.likeCount--;
           return tweetDocument.update({ likeCount: tweetData.likeCount});
         }).then(() => {
           return res.json(tweetData);
         })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    })
}

exports.deleteTweet = (req, res) => {
  let document = db.doc(`/tweets/${req.params.tweetId}`);
  document.get()
          .then(doc => {
            if(!doc.exists){
              return res.status(404).json({error: "Tweet does not exist!"});
            }
            if(doc.data().handle !== req.user.handle){
              return res.status(403).json({error: "You are not authorized to delete this tweet!"});
            }else{
              return document.delete();
            }
          }).then(() => {
            return res.json({message: "Tweet deleted successfullY!"});
          }).catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
          })
}

