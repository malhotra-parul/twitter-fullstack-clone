import React from "react";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ProfileOptions from "../components/ProfileOptions";
import MyProfile from "../components/MyProfile";
import WhoToFollow from "../components/WhoToFollow";
import Tweets from '../components/Tweets';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(3),
  },
  paper: {
    borderRadius: "15px",
    padding: "15px",
  }
}));

const Feed = ({ isAuthenticated }) => {
  const classes = useStyles();
  if(!isAuthenticated){
    return <Redirect to="/login" />
  };

  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item sm={3} xs={12}>
        <Grid container 
              direction='column'
              spacing={2}>
          <Grid item>
            <Paper className={classes.paper} elevation={4}>
              <ProfileOptions page="feed"/>
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.paper} elevation={4}>
              <MyProfile />
            </Paper>
          </Grid> 
        </Grid>
      </Grid>
      <Grid item sm={5} xs={12}>
        <Paper className={classes.paper} elevation={4}>
          <Tweets />
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper} elevation={4}>
          <WhoToFollow />
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Feed);
