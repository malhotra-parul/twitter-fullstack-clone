import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    padding: theme.spacing(2),
    height: "600px",
    backgroundColor: '#f2f7f7'
  },
  gridContainer: {
    padding: 20,
  },
}));

const Signin = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      className={classes.gridContainer}
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <Login />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <Signup />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signin;
