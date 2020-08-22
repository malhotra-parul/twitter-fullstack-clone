import React, { useEffect } from "react";
import "./App.css";
import Feed from "./pages/feed";
import Login from "./components/Login";
import ProfilePage from "./pages/profile";
import Signup from "./components/Signup";
import NavBar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getUserData } from "./redux/user/userActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      light: "#46b6f0", //nav bar color, bg color
      dark: "#ea6ea8",
      contrastText: "#46b6f0", //grey
    },
    text: {
      primary: '#fff',
      secondary: '#46b6f0'
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
            <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
