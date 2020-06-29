import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from './Tweet';

const Tweets = () => {

  const [tweets, setTweets] = useState(null);  
  useEffect(() => {
    axios
      .get("/tweets")
      .then((res) => {
          setTweets(res.data)
      })
      .catch((err) => console.error(err));
  }, []);
  const displayTweets = tweets ? (
      tweets.map(tweet => <Tweet tweet={tweet}/>)
  ) : (
      <p>Loading...</p>
  ); 

  return <div>
      {displayTweets}
  </div>;
};

export default Tweets;
