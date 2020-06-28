import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(2),
  },
}));

const Feed = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={3}>
        <Paper>
          <Typography color="textPrimary">Profile</Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper>
          <Typography color="textPrimary">Tweets</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Typography color="textPrimary">Who to follow?</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Feed;
