import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Home from "./containers/Home/Home";
import NotFound from "containers/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import Reactivate from "containers/Auth/Reactivate/Reactivate";
import Latest from "containers/Auth/Latest/Latest";
import Trendings from "containers/Trendings/Trendings";

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
          <Route path="/reactivate" component={Reactivate} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/latest" component={Latest} />
          <ProtectedRoute path="/trendings" component={Trendings} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
