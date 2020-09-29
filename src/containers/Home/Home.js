import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import GridPosters from "components/GridPosters/GridPosters";
import ModalLoading from "components/ModalLoading/ModalLoading";

import instance from "axios-instance";

class Home extends Component {
  state = {
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
        this.setState({ loading: false });
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
        this.setState({ loading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCategories();
    this.getPapers();

    if (this.state.papers && this.state.categories) {
      this.setState({
        loading: false,
      });
    }
  }

  searchBarChangedHandler = (event) => {
    let searchText = event.target.value;
    setTimeout(() => {
      const payload = {
        search: searchText,
      };

      instance
        .post("paper-search/", payload)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ filteredPapers: response.data });
          }
        })
        .catch((err) => console.log(err));
    }, 700);
  };

  closeSearchBarHandler = () => {
    this.setState({ filteredPapers: null });
  };

  render() {
    let content = null;
    if (this.state.filteredPapers) {
      content = (
        <GridPosters
          data={this.state.filteredPapers}
          categories={this.state.categories}
        />
      );
    } else {
      content = (
        <div>
          <Banner categories={this.state.categories} />
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
        {this.state.loading && <ModalLoading />}
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
