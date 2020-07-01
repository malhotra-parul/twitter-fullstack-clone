import React from "react";
import "./App.css";
import Feed from "./pages/feed.js";
import Signin from "./pages/signin.js";
import NavBar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#46b6f0", //twitter button blue color
      light: "#253341", //nav bar color, bg color
      dark: '#3291da',
      contrastText: '#fff' //white
    },
    secondary: {
      main: "#46b6f0", //twitter button blue color
      light: "#253341", //nav bar color, bg color
      dark: '#172e3f',
      contrastText: '#37474f' //grey
    },
    type: 'dark'
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});
theme.shadows[24] = theme.shadows[4];

function App() {

  let authenticated;
  const token = localStorage.getItem("FBtoken");
  console.log(token);
  if(token){
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()){
      window.location.href = "/signin";
      authenticated = false;
    }else{
      authenticated = true;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <AuthRoute authenticated={authenticated} path="/signin" component={Signin} />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
