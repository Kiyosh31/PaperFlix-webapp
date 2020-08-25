import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import instance from "axios-instance";
import Footer from "components/Footer/Footer";

class Home extends Component {
  state = {
    showModal: true,
    loading: true,
    trendings: [],
  };

  componentDidMount() {
    instance
      .get("paper-list/")
      .then((response) => {
        const trendings = response.data;
        this.setState({
          trendings: trendings,
          showModal: false,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ showModal: false, loading: false });
        console.log(err);
      });
  }

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let homePage = null;
    if (this.state.loading) {
      homePage = <Spinner />;
    }

    return (
      <div>
        <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosed={this.modalHandler}
        >
          {homePage}
        </Modal>
        <Toolbar />
        <Banner openModal={this.modalHandler} />
        <Row
          title="TRENDINGS"
          data={this.state.trendings}
          isLargeRow={true}
          clicked={this.modalHandler}
        />
        <Row
          title="COSMOS"
          data={this.state.trendings}
          clicked={this.modalHandler}
        />
        <Row
          title="BIOLOGIA"
          data={this.state.trendings}
          clicked={this.modalHandler}
        />
        <Row
          title="MATEMATICAS"
          data={this.state.trendings}
          clicked={this.modalHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
