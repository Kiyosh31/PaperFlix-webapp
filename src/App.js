import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Home from "./containers/Home/Home";
import NotFound from "containers/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

class App extends Component {
  state = {
    auth: null,
  };

  render() {
    return (
      <div className="app__color">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/home" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
