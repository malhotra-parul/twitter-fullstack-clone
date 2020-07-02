import React from "react";
import "./App.css";
import Feed from "./pages/feed";
import Signin from "./pages/signin";
import NavBar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";

//Redux setup
//Provider will make the store available to our nested components which are wrapped 
//inside connect() function.
import { Provider } from "react-redux";
import store from "./redux/reducers/store";

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

 let authenticated;
  const token = localStorage.getItem("FBtoken");
  console.log("token", token);

  if(token){
    const decodedToken = jwtDecode(token);
    
    if(decodedToken.exp * 1000 < Date.now()){
      
      // localStorage.removeItem("FBtoken");
      authenticated = false;
      window.location.href = "/signin";
      localStorage.clear();
    }else{
      authenticated = true;
    }
  } 

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <AuthRoute exact path="/signin" component={Signin} authenticated={authenticated}  />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
        </Provider>
    </ThemeProvider>
  );
}

export default App;
