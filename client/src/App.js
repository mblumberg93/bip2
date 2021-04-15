import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.scss";
import Home from "./Home/Home";
import Game from "./Game/Game";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:gamecode" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;