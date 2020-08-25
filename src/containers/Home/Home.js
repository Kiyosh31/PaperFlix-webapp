import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Modal from "components/Modal/Modal";

class Home extends Component {
  state = {
    showModal: false,
  };

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const fetchURL = "paper-list/";

    return (
      <div>
        <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosed={this.modalHandler}
        >
          Hola
        </Modal>
        <Toolbar />
        <Banner openModal={this.modalHandler} />
        <Row
          title="TRENDINGS"
          fetchURL={fetchURL}
          isLargeRow={true}
          clicked={this.modalHandler}
        />
        <Row title="COSMOS" fetchURL={fetchURL} clicked={this.modalHandler} />
        <Row title="BIOLOGIA" fetchURL={fetchURL} clicked={this.modalHandler} />
        <Row
          title="MATEMATICAS"
          fetchURL={fetchURL}
          clicked={this.modalHandler}
        />
      </div>
    );
  }
}

export default Home;
