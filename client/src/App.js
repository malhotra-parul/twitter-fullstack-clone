import React, { useEffect } from "react";
import "./App.css";
import Feed from "./pages/feed";
import Signin from "./pages/signin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import setAuthToken from "./utils/setAuthToken";

//Redux setup
//Provider will make the store available to our nested components which are wrapped
//inside connect() function.
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  logoutUser,
  setAuthenticated,
  getUserData,
} from "./redux/user/userActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { TextareaAutosize } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#46b6f0", //twitter button blue color
      light: "#253341", //nav bar color, bg color
      dark: "#3291da",
      contrastText: "#fff", //white
    },
    secondary: {
      main: "#46b6f0", //twitter button blue color
      light: "#253341", //nav bar color, bg color
      dark: "#172e3f",
      contrastText: "#37474f", //grey
    },
    type: "dark",
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
theme.shadows[24] = theme.shadows[4];

const token = localStorage.FBtoken;


if (token) {
  setAuthToken(token);
}

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <Route exact path="/feed" component={Feed} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
