import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileOptions from "../components/ProfileOptions";
import MyProfile from "../components/MyProfile";
import WhoToFollow from "../components/WhoToFollow";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(3),
  },
  paper: {
    borderRadius: "15px",
    padding: "15px",
  },
}));

const Feed = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={3}>
        <Grid container 
              xs={12} 
              direction='column'
              spacing={2}>
          <Grid item>
            <Paper className={classes.paper} elevation={4}>
              <ProfileOptions />
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.paper} elevation={4}>
              <MyProfile />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Paper>
          <Typography color="textPrimary">Tweets</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper} elevation={4}>
          <WhoToFollow />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Feed;
