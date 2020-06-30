import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progress: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }
});

const Tweets = () => {
  const classes = useStyles();

  const [tweets, setTweets] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/tweets")
      .then((res) => {
        setTweets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const displayTweets = tweets
    ? tweets.map((tweet) => <Tweet tweet={tweet} key={tweet.tweetId} />)
    : loading && (
        <div className={classes.progress}>
          <CircularProgress size="6rem" color="primary" />
        </div>
      );

  return <div>{displayTweets}</div>;
};

export default Tweets;
