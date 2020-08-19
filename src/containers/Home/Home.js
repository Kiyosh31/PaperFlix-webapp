import React from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Nav from "components/Nav/Nav";

import requests from "Requests";

const Home = () => {
  return (
    <div>
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
};

export default Home;
