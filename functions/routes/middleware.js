const { admin, db } = require("../utils/admin");

module.exports = (req, res, next) => {
    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      console.log("No token found!");
      return res.status(403).json({ error: "Unauthorized!" });
    }
    admin.auth().verifyIdToken(idToken)
         .then(decodedToken => {
             console.log(decodedToken, "decodedToken");
             req.user = decodedToken;
             return db.collection("users").where("userId", "==", req.user.uid)
                      .limit(1)
                      .get();
         }).then(data =>{
             req.user.handle = data.docs[0].data().handle;
             return next();
         }).catch((err)=>{
             console.error("Invalid token", err);
             if(err.code === "auth/argument-error"){
              return res.status(403).json({error: "Error in verifying the token!"});
             }
             return res.status(403).json(err);
         })
  };