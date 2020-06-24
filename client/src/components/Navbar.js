import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from "@material-ui/core/styles"
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyle = makeStyles({
    appbar: {
        background: 'white'
    },
    logo: {
        color: '#3291da'
    }
})
const NavBar = () => {
    const classes = useStyle();
    return (
        <AppBar position='static' className={classes.appbar}>
            <Toolbar>
                <TwitterIcon fontSize="large" className={classes.logo}/>
            </Toolbar>
        </AppBar>
      );
}
 
export default NavBar;
