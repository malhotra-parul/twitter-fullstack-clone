import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { logoutUser } from "../redux/user/userActions";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "12px",
  },
  font: {
    fontWeight: theme.typography.fontWeightBold,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

}));

const MyProfile = ({ credentials, logoutUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { handle } = credentials;

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogoutClick = (event) => {
    logoutUser();
    // history.push("/signin");
  };

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
              {handle && handle.charAt(0).toUpperCase() + handle.slice(1)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <ArrowDropDownIcon
          color="primary"
          fontSize="small"
          onClick={openMenu}
        />
        <Menu
          width={300}
          anchorEl={anchorEl}
          keepMounted
          variant="selectedMenu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              marginRight: "20px",
              marginTop: "40px",
              width: "15ch",
              borderRadius: "2ch"
            }
          }}
        >
          <MenuItem>
            <Link href="/profile" underline="none" 
                  color="textPrimary">
                  My Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  loading: state.ui.loading,
});

const mapActionToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionToProps)(MyProfile);
