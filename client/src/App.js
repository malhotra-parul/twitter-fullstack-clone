import React from "react";
import "./App.css";
import Feed from "./pages/feed.js";
import Signin from "./pages/signin.js";
import NavBar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route exact path="/" component={Feed} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
