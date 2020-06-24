import React from "react";
import "./App.css";
import Feed from "./pages/feed.js";
import Signin from "./pages/signin.js";
import NavBar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3291da",
    },
    secondary: {
      main: "#f6a5c0",
    },
  },
});

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
