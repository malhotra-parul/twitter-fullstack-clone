import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from "react-router-dom/Link";


const styles = (theme) => ({
  card: {
    padding: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: '70px auto' ,
    gridGap: '16px',
    paddingBottom: "0",
    borderBottom: "1px solid grey",
    "&:hover": {
      background: "#383737",
    },
  },
  content: {
      padding:'0',
      paddingLeft: '10px'
  },
  image: {
    height: "40px",
    width: "50px",
    borderRadius: '50%',
    padding: "10px",
    objectFit: "cover"
  },
});

const Tweet = (props) => {
  const {
    classes,
    tweet: {
      tweetId,
      tweetHandle,
      tweetContent,
      createdAt,
      likeCount,
      commentCount,
      userImage,
    },
  } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Typography
          color="textPrimary"
          variant="h6"
          component={Link}
          to={`/users/${tweetHandle}`}
        >
          {tweetHandle.slice(0, 1).toString().toUpperCase() +
            tweetHandle.slice(1).toString()}
        </Typography>
   
        <Typography variant="body2" color="textSecondary">
          {"  ·  " + createdAt}
        </Typography>
        <Typography variant="body1">{tweetContent}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Tweet);
