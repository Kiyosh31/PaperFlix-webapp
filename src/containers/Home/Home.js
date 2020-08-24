import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Modal from "components/Modal/Modal";

class Home extends Component {
  state = {
    showModal: true,
  };

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const fetchURL = "paper-list/";

    return (
      <div>
        {/* <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosed={this.modalHandler}
        >
          Hola
        </Modal> */}
        <Toolbar />
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
