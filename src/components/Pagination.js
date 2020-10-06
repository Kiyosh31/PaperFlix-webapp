import instance from "axios-instance";
import React, { Component } from "react";

class Pagination extends Component {
  state = {
    categories: [],
  };

  getCategories = async () => {
    await instance
      .get("category-list/")
      .then((response) => {
        if (response.status === 200) {
          const res = response.data;
          this.setState({
            categories: res.map((category) => {
              return { ...category, lastPaper: 0, papers: [] };
            }),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  getPapers = () => {
    this.state.categories.map((category) => {
      instance
        .get(`paper-pagination/${category.id_category}/${category.lastPaper}/`)
        .then((response) => {
          if (response.status === 200) {
            const updatedState = {
              ...this.state.categories,
              [category.id_category]: {
                ...this.state.categories[category.id_category],
                papers: [...category.paper, ...response.data],
              },
            };

            this.setState({ categories: updatedState });
          }
        })
        .catch((err) => console.log(err));
    });
  };

  componentDidMount() {
    this.getCategories();
    this.getPapers();
  }

  render() {
    console.log("categorias", this.state.categories);
    return <div>{this.props.children}</div>;
  }
}

export default Pagination;
