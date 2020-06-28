import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1)
  },
  button: {
      borderRadius: '25px',
      padding: '10px 20px'
  }
}));

const ProfileOptions = () => {
  const classes = useStyles();
  return (
    <Grid container >
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justify="flex-start"
        className={classes.grid}
        direction="row"
        spacing={4}
      >
        <Grid item>
          <HomeIcon color='primary' fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h5">Home</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justify="flex-start"
        className={classes.grid}
        direction="row"
        spacing={4}
      >
        <Grid item>
          <PersonIcon color='primary' fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h5">Profile</Typography>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justify="flex-start"
        className={classes.grid}
        direction="row"
        spacing={4}
      >
        <Grid item>
          <NotificationsIcon  color='primary' fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h5">Notifications</Typography>
        </Grid>
      </Grid>


      <Grid
        item
        xs={12}
        alignItems="center"
        className={classes.grid}
        spacing={4}
      >
        <Button variant='contained' 
                className={classes.button} 
                fullWidth
                color='primary'
                >Tweet</Button>
      </Grid>
    </Grid>
  );
};

export default ProfileOptions;
