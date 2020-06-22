const { admin, db } = require("../utils/admin");
const firebase = require("../firebase");
const validator = require("email-validator");

const isEmpty = (string) => (string.trim() === "" ? true : false);

const validPassword = (string) => {
  const regex = new RegExp(/\d/, "gm");
  return regex.test(string);
};

const reduceUserDetails = (data) => {
  let userDetails = {};
  if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if(!isEmpty(data.location.trim())) userDetails.location = data.location;
  if(!isEmpty(data.website.trim())){
    if(data.website.trim().slice(0,4) !== "http"){
      userDetails.website = `http://${data.website.trim()}`
    }else userDetails.website = data.website;
  }
  return userDetails;
}

//signup
exports.signup = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
    };
    let errors = {};
    if (isEmpty(newUser.email)) {
      errors.email = "Must not be empty";
    } else if (!validator.validate(newUser.email)) {
      errors.email = "Invalid email address";
    }
  
    if (isEmpty(newUser.password)) {
      errors.password = "Must not be empty";
    } else if (newUser.password.length < 6) {
      errors.password = "Should be a minimum of 6 characters.";
    } else if (!validPassword(newUser.password)) {
      errors.password = "Password must include a numeric character!";
    }
  
    if (newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "Passwords must match!";
    }
  
    if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";
  
    //if errors object is not empty we won't proceed with rest of stuff.
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
  
    //After validating input data-->
    let tokenKey;
    let userId;
    let imageUrl = `https://firebasestorage.googleapis.com/v0/b/twitter-ee105.appspot.com/o/no-img.png?alt=media`;
  
    db.doc(`/users/${newUser.handle}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res
            .status(400)
            .json({ handle: "This handle is already in use!" });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((token) => {
        tokenKey = token;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          imageUrl : imageUrl,
          createdAt: new Date().toISOString(),
          userId,
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ tokenKey });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res.status(400).json({ email: "Email already in use!" });
        } else {
          return res.status(500).json({ general: 'Something went wrong, please try again!' });
        }
      });
  }

  //login route
  exports.login = (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
  
    let errors = {};
    if (isEmpty(user.email)) errors.email = "Must not be empty";
    if (isEmpty(user.password)) errors.password = "Must not be empty";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.json({ token });
      })
      .catch((err) => {
        console.error(err);
       return res.status(403).json({general: 'Wrong credentials, please try again!'})
      });
  }

  exports.uploadImage = (req, res)=> {
    const Busboy = require("busboy");
    const { v4: uuidv4 } = require('uuid');
    const path = require("path");
    const fs = require("fs");
    const os = require("os");
    let imageFileName;
    let imageToBeUploaded = {};
    const busboy = new Busboy({ headers: req.headers });

    //create a file named "imageFileName" having extension "fileExtension"
    //at path "filepath". We store it in the form of an object holding
    //filepath and mimetype. We then write the file using pipe() in nodejs.
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(mimetype);
      if(mimetype !== "image/jpeg" && mimetype !== "image/png"){
        return res.status(400).json({error: "Please uplod in image format"})
      }
      const fileExtension = filename.split(".")[filename.split(".").length -1];
      imageFileName = `${uuidv4()}.${fileExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", ()=>{
      admin.storage().bucket("twitter-ee105.appspot.com").upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(()=>{
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/twitter-ee105.appspot.com/o/${imageFileName}?alt=media`;
      return db.doc(`/users/${req.user.handle}`).update({ imageUrl});
    } )
      .then(()=>{
        return res.json({message: "Image uploaded successfully!"});
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
      })
    });
    busboy.end(req.rawBody);
  }

  //add user details
  exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);
    db.doc(`/users/${req.user.handle}`).update(userDetails)
    .then( () =>{
      return res.json({"message": "Details added successfully!"})
    }).catch(err =>{
      console.error(err);
      return res.status(500).json({"error": err.code});
    })
  }

  //get own user data - user credentials + liked-posts data
  exports.getOwnUserData = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.handle}`).get()
      .then(doc => {
        if(doc.exists){
        userData.credentials = doc.data();
        return db.collection("likes").where("likedBy", "==", req.user.handle).get();
        }else return res.status(400).json({error: "User does not exist!"});
      }).then(data => {
        userData.likes = [];
        data.forEach(doc => {
          userData.likes.push(doc.data());
        })
        return db.collection("notifications").where("recipient", "==", req.user.handle)
                  .orderBy('createdAt', 'desc').limit(10).get()
    
      }).then((docs) => {
        userData.notifications = [];
        docs.forEach(doc => {
          userData.notifications.push({
            'recipient': doc.data().recipient,
            'sender': doc.data().sender,
            'createdAt': doc.data().createdAt,
            'tweetId': doc.data().tweetId,
            'type': doc.data().type,
            'read': doc.data().read,
            'notificationId': doc.id
          })
        });
        return res.json(userData);
      })
        .catch(err => {
        console.error(err);
        res.status(500).json({error: err.code});
      })
  }

  exports.getDetailsOfAnyUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.handle}`).get()
      .then((doc) => {
        if(doc.exists){
          userData.user = doc.data();
          return db.collection("tweets").where('handle', "==", req.params.handle)
                    .orderBy('createdAt', 'desc').get()
        } else{
          return res.status(404).json({error: "User does not exist!"});
        }
      }).then( data => {
        userData.tweets = [];
        data.forEach(doc =>{
          userData.tweets.push({
            createdAt: doc.data().createdAt,
            handle: doc.data().handle,
            imageUrl: doc.data().imageUrl,
            commentCount: doc.data().commentCount,
            likeCount: doc.data().likeCount,
            content: doc.data().content,
            tweetId: doc.id
          });
        })
        return res.json(userData);
      }).catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
      })
  }

exports.markNotificationsRead = (req, res) => {
  
  let batch = db.batch();
  req.body.forEach(notificationId => {
    const notification = db.doc(`notifications/${notificationId}`);
    batch.update(notification, {read: true});
  })
  batch.commit().then(()=> {
    return res.json({message: "Notifications marked read!"});
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({error: err.code});
  })
}