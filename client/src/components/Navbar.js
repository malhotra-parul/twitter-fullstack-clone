import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from "@material-ui/core/styles"
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyle = makeStyles({
    appbar: {
        background: '#253341'
    },
    logo: {
        color: '#46b6f0'
    }
})
const NavBar = () => {
    const classes = useStyle();
    return (
        <AppBar elevation={7} position='static' className={classes.appbar}>
            <Toolbar>
                <TwitterIcon fontSize="large" className={classes.logo}/>
            </Toolbar>
        </AppBar>
      );
}
 
export default NavBar;
