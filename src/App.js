import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Home from "./containers/Home/Home";

class App extends Component {
  render() {
    return (
      <div className="app__color">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={Login}>
            {/* <Redirect to="/login" /> */}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
