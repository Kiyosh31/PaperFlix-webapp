import React, { Component } from "react";

import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import Row from "components/Row/Row";
import ModalLoading from "components/ModalLoading/ModalLoading";
import GridPosters from "components/GridPosters/GridPosters";

import APICalls from "APICalls/APICalls";

class Trendings extends Component {
  state = {
    loading: true,
    categories: [],
    recommended: [],
    trendings: [],
    topTen: [],
    mightLike: [],
    searched: null,
    filteredPapers: null,
    canSearch: null,
  };

  async componentDidMount() {
    // Categorias
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

    // Recommended
    try {
      const fetchedRecommended = await APICalls.getRecommendedPapers();
      if (fetchedRecommended) {
        this.setState({
          recommended: fetchedRecommended,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }

    // Trendings
    try {
      const fetchedTrendings = await APICalls.getTrendingPapers();
      if (fetchedTrendings) {
        this.setState({
          trendings: fetchedTrendings,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }

    // Top Ten
    try {
      const fetchedTopTen = await APICalls.getTopTenPapers();
      if (fetchedTopTen) {
        this.setState({
          topTen: fetchedTopTen,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }

    // Might Like
    try {
      const fetchedMightLike = await APICalls.getMightLikePapers();
      if (fetchedMightLike) {
        this.setState({
          mightLike: fetchedMightLike,
          loading: false,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      });
    }
  }

  searchBarChangedHandler = (event) => {
    let searchText = event.target.value.trim();

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
        <div style={{ paddingTop: "100px" }}>
          <Row
            title="Recomendado para ti"
            data={this.state.recommended}
            categories={this.state.categories}
            large
          />
          <Row
            title="Tendencias"
            data={this.state.trendings}
            categories={this.state.categories}
          />
          <Row
            title="Top 10"
            data={this.state.topTen}
            categories={this.state.categories}
          />
          <Row
            title="Podrian Gustarte"
            data={this.state.mightLike}
            categories={this.state.categories}
          />
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

export default Trendings;
