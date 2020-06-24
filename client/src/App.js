import React from "react";
import "./App.css";
import feed from "./pages/feed";
import signin from './pages/signin.js';

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin" component={signin} />
          <Route exact path="/" component={feed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
