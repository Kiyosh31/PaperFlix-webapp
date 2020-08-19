import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Home from "./containers/Home/Home";

class App extends Component {
  render() {
    return (
      <div className="app__color">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
