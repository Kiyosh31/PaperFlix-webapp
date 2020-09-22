import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import Footer from "components/Footer/Footer";

import instance from "axios-instance";
import GridPosters from "components/GridPosters/GridPosters";

class Home extends Component {
  state = {
    showModal: true,
    loading: true,
    papers: [],
    search: null,
  };

  componentDidMount() {
    instance
      .get("papers-get/")
      .then((response) => {
        const papers = response.data;
        this.setState({
          papers: papers,
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

  searchBarHandler = (event) => {
    this.setState({ search: event.target.value });
  };

  closeSearchBarHandler = () => {
    this.setState({ search: null });
  };

  render() {
    let spinner = null;
    if (this.state.loading) {
      spinner = <Spinner />;
    }

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosedByBackdrop={this.modalHandler}
          transparent
        >
          {spinner}
        </Modal>
      );
    } else {
      modal = null;
    }

    let filteredPapers = null;
    if (this.state.search === "" || this.state.search === null) {
      filteredPapers = this.state.papers;
    } else {
      filteredPapers = this.state.papers.filter((paper) => {
        return (
          paper.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
          paper.author.toLowerCase().includes(this.state.search.toLowerCase())
        );
      });
    }

    for (let i = 0; i < this.state.papers.length; i++) {
      console.log("papers", this.state.papers[i]);
    }

    let content = null;
    if (this.state.search) {
      content = <GridPosters data={filteredPapers} />;
    } else {
      content = (
        <div>
          <Banner />
          {Object.keys(this.state.papers).map((category, index) => (
            <Row
              key={index}
              title={category}
              data={this.state.papers[category]}
            />
          ))}
          {/* <Row title="TRENDINGS" isLargeRow data={filteredPapers} />
          <Row title="COSMOS" data={filteredPapers} />
          <Row title="BIOLOGIA" data={filteredPapers} />
          <Row title="MATEMATICAS" data={filteredPapers} /> */}
        </div>
      );
    }

    return (
      <div>
        {modal}
        <Toolbar
          searchBarHandler={this.searchBarHandler}
          closeSearchBarHandler={this.closeSearchBarHandler}
          searched={this.state.search}
        />
        {content}
        <Footer />
      </div>
    );
  }
}

export default Home;
