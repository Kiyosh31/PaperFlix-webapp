import React, { Component } from "react";
import "./App.css";

import Row from "./components/Row/Row";
import Banner from "./components/Banner/Banner";
import Nav from "./components/Nav/Nav";
import requests from "./Requests";

class App extends Component {
  render() {
    return (
      <div className="app__color">
        <Nav />
        <Banner />
        <Row
          title="TRENDINGS"
          fetchURL={requests.fetchPapers}
          isLargeRow={true}
        />
        <Row title="COSMOS" fetchURL={requests.fetchPapers} />
        <Row title="BIOLOGIA" fetchURL={requests.fetchPapers} />
        <Row title="MATEMATICAS" fetchURL={requests.fetchPapers} />
      </div>
    );
  }
}

export default App;
