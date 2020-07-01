import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grid: {
    padding: "20px 10px",
  },
  font: {
    fontWeight: theme.typography.fontWeightBold ,
    fontSize: '24px'
  },
  button: {
    borderRadius: '5px',
    padding: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      padding: '8px 10px'  
    }
},
  top: {
    paddingTop: "14px",
    fontWeight: 'bolder',
  },
}));

const WhoToFollow = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.grid}>
      <Typography variant="h5" gutterBottom className={classes.font}>
        Who to follow
      </Typography>
      <Divider />
      <Grid container spacing={2} direction="row" className={classes.top}>
        <Grid item xs={2}>
          Pic
        </Grid>
        <Grid item xs={7}>
          <Grid container direction="column">
            <Grid item>Name</Grid>
            <Grid item>Handle</Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" 
                  className={classes.button} 
                  fullWidth
                  color='primary'>Follow</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WhoToFollow;
