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
    filteredPapers: null,
  };

  getCategories = () => {
    instance
      .get("category-list/")
      .then((response) => {
        if (response.status === 200) {
          const categories = response.data;
          this.setState({
            categories: categories,
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

  searchBarChangedHandler = (event) => {
    let searchText = event.target.value;
    setTimeout(() => {
      const payload = {
        search: searchText,
      };

      instance
        .post("papers-search/", payload)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ filteredPapers: response.data });
          }
        })
        .catch((err) => console.log(err));
    }, 3000);
  };

  closeSearchBarHandler = () => {
    this.setState({ filteredPapers: null });
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

    let content = null;
    if (this.state.filteredPapers) {
      content = <GridPosters data={this.state.filteredPapers} />;
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
          searchBarChangedHandler={this.searchBarChangedHandler}
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
