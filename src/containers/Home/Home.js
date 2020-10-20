import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import GridPosters from "components/GridPosters/GridPosters";
import ModalLoading from "components/ModalLoading/ModalLoading";

import APICalls from "APICalls/APICalls";

class Home extends Component {
  state = {
    loading: true,
    categories: [],
    papers: [],
    randomPaper: null,
    filteredPapers: null,
    canSearch: null,
  };

  async componentDidMount() {
    try {
      const fetchedCategories = await APICalls.getAllCategories();
      if (fetchedCategories) {
        this.setState({ categories: fetchedCategories });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }

    try {
      const fetchedPaper = await APICalls.getRandomPaper();
      this.setState({ randomPaper: fetchedPaper });
    } catch (err) {
      console.log(err);
    }

    try {
      const fetchedPapers = await APICalls.getAllPapers();
      if (fetchedPapers) {
        this.setState({ papers: fetchedPapers });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }

    if (this.state.papers && this.state.categories) {
      this.setState({
        loading: false,
      });
    }
  }

  searchBarChangedHandler = (event) => {
    let searchText = event.target.value;

    if (this.state.canSearch !== null || this.state.canSearch !== undefined) {
      clearTimeout(this.state.canSearch);
    }

    const myRef = setTimeout(async () => {
      const payload = {
        search: searchText,
      };

      try {
        const fetchedSearch = await APICalls.searchPapers(payload);
        if (fetchedSearch) {
          this.setState({ filteredPapers: fetchedSearch });
        }
      } catch (err) {
        console.log(err);
      }
    }, 700);

    this.setState({ canSearch: myRef });
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
          <Banner
            randomPaper={this.state.randomPaper}
            categories={this.state.categories}
          />
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
