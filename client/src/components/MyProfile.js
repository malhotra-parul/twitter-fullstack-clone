import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
   
  grid: {
    padding: "12px",
  },
  font: {
    fontWeight: theme.typography.fontWeightBold,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
}));

const MyProfile = ({ credentials }) => {
  const classes = useStyles();
  console.log(credentials);
  const { handle } = credentials;
  return (
  
    <Grid container spacing={1} direction="row" className={classes.grid}>
      <Grid item xs={3}>
        <Avatar
          className={classes.large}
          alt="Profile Photo"
          src={credentials.imageUrl}
        />
      </Grid>
      <Grid item xs={8}>
        <Grid container direction="column">
          <Grid item className={classes.font}>
            <Typography variant="h6">
              {handle.charAt(0).toUpperCase() + handle.slice(1)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <ArrowDropDownIcon color="primary" fontSize="small" />
      </Grid>
    </Grid>

  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps)(MyProfile);
