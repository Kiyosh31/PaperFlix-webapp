import React, { Component } from "react";

import Row from "components/Row/Row";
import Banner from "components/Banner/Banner";
import Toolbar from "components/Toolbar/Toolbar";
import Footer from "components/Footer/Footer";
import GridPosters from "components/GridPosters/GridPosters";
import ModalLoading from "components/ModalLoading/ModalLoading";
import ErrorModal from "components/ErrorModal/ErrorModal";

import APICalls from "APICalls/APICalls";

class Home extends Component {
  state = {
    loading: true,
    categories: [],
    papers: [],
    error: null,
    randomPaper: null,
    filteredPapers: null,
    canSearch: null,
  };

  async componentDidMount() {
    let errorsInData = [];

    try {
      const fetchedCategories = await APICalls.getAllCategories();
      if (fetchedCategories) {
        this.setState({ categories: fetchedCategories });
      }
    } catch (err) {
      errorsInData.push("No se pudieron obtener las categorias");
    }

    try {
      const fetchedPaper = await APICalls.getRandomPaper();
      this.setState({ randomPaper: fetchedPaper });
    } catch (err) {
      errorsInData.push("No se pudo obtener el articulo de cabecera");
    }

    try {
      const fetchedPapers = await APICalls.getAllPapers();
      if (fetchedPapers) {
        this.setState({ papers: fetchedPapers });
      }
    } catch (err) {
      errorsInData.push("No se pudieron obtener todos los articulos");
    }

    if (errorsInData.length > 0) {
      this.setState({
        error: errorsInData,
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
    let searchText = event.target.value.trim();

    if (this.state.canSearch !== null || this.state.canSearch !== undefined) {
      clearTimeout(this.state.canSearch);
    }

    const myRef = setTimeout(async () => {
      this.setState({ loading: true });

      const payload = {
        search: searchText,
      };

      try {
        const fetchedSearch = await APICalls.searchPapers(payload);
        if (fetchedSearch) {
          this.setState({ filteredPapers: fetchedSearch, loading: false });
        }
      } catch (err) {
        const errorData = ["Error al intentar buscar"];
        this.setState({
          error: errorData,
          loading: false,
        });
      }
    }, 700);

    this.setState({ canSearch: myRef });
  };

  closeSearchBarHandler = () => {
    this.setState({ filteredPapers: null });
  };

  modalHandler = () => {
    this.setState({ error: null });
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
          <p
            style={{
              color: "white",
              marginLeft: "20px",
              marginTop: "10px",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Para navegar entre las categorias presionar shift y mover la rueda
            del raton sobre la fila
          </p>
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
        {this.state.error && (
          <ErrorModal onClose={this.modalHandler} text={this.state.error} />
        )}
      </div>
    );
  }
}

export default Home;
