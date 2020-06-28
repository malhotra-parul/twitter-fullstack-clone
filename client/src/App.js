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
      main: "#1976d2", //twitter button blue color
      light: "#253341", //nav bar color, bg color
      contrastText: '#fff' //white
    },
    type: 'dark'
  },
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
