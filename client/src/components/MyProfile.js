import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
    grid: {
        padding: '12px'
    }
})

const MyProfile = () => {
    const classes = useStyles();
    return ( 
        <Grid container spacing={2} direction='row' className={classes.grid}>
            <Grid item xs={3}>Pic</Grid>
            <Grid item xs={8}>
                <Grid container direction='column'>
                <Grid item>Name</Grid>
                <Grid item>Handle</Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}>
                <ArrowDropDownIcon color='primary' fontSize='medium'/>
            </Grid>
        </Grid>
     );
}
 
export default MyProfile;