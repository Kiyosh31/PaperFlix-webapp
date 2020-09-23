import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Modal from "components/Modal/Modal";
import Spinner from "components/Spinner/Spinner";
import Footer from "components/Footer/Footer";
import GridPosters from "components/GridPosters/GridPosters";

import instance from "axios-instance";

class Home extends Component {
  state = {
    showModal: true,
    loading: true,
    categories: [],
    papers: [],
    search: null,
  };

  getCategories = () => {
    instance
      .get("category-list/")
      .then((response) => {
        if (response.status === 200) {
          const categories = response.data;
          this.setState({
            categories: categories,
            // showModal: false,
            // loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ showModal: false, loading: false });
        console.log(err);
      });
  };

  getPapers = () => {
    instance
      .get("paper-list/")
      .then((response) => {
        if (response.status === 200) {
          const papers = response.data;
          this.setState({
            papers: papers,
            // showModal: false,
            // loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ showModal: false, loading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCategories();
    this.getPapers();

    if (this.state.papers && this.state.categories) {
      this.setState({
        showModal: false,
        loading: false,
      });
    }
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

    // let filteredPapers = null;
    // if (this.state.search === "" || this.state.search === null) {
    //   filteredPapers = this.state.papers;
    // } else {
    //   filteredPapers = this.state.papers.filter((paper) => {
    //     return (
    //       paper.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
    //       paper.author.toLowerCase().includes(this.state.search.toLowerCase())
    //     );
    //   });
    // }

    let content = null;
    if (this.state.search) {
      // content = <GridPosters data={filteredPapers} />;
    } else {
      content = (
        <div>
          <Banner />
          {this.state.categories.map((category, index) => (
            <Row
              key={index}
              title={category.category}
              data={this.state.papers.filter(
                (paper) => paper.id_category === category.id_category
              )}
            />
          ))}
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
