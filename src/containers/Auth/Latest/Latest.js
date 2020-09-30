import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import Row from "components/Row/Row";
import ModalLoading from "components/ModalLoading/ModalLoading";
import GridPosters from "components/GridPosters/GridPosters";

import instance from "axios-instance";

class Latest extends Component {
  state = {
    loading: true,
    categories: [],
    papers: [],
    searched: null,
    filteredPapers: null,
  };

  getCategories = () => {
    instance
      .get("category-list/")
      .then((response) => {
        if (response.status === 200) {
          this.setState({ categories: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  getLatestPapers = () => {
    instance
      .get("paper-latest/")
      .then((response) => {
        if (response.status === 200) {
          this.setState({ papers: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.getCategories();
    this.getLatestPapers();

    if (this.state.categories && this.state.papers) {
      this.setState({ loading: false });
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
          return;
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
        <div style={{ paddingTop: "85px" }}>
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

export default Latest;
