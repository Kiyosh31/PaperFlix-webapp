import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Nav from "components/Nav/Nav";

class Home extends Component {
  render() {
    const fetchURL = "paper-list/";

    return (
      <div>
        <Nav />
        <Banner />
        <Row title="TRENDINGS" fetchURL={fetchURL} isLargeRow={true} />
        <Row title="COSMOS" fetchURL={fetchURL} />
        <Row title="BIOLOGIA" fetchURL={fetchURL} />
        <Row title="MATEMATICAS" fetchURL={fetchURL} />
      </div>
    );
  }
}

export default Home;
