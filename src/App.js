import React, { Component } from "react";
import "./App.css";

import Layout from "./components/Layout/Layout";

class App extends Component {
  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/user-list/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <p>PaperFlix esta vivo!</p>
        </Layout>
      </div>
    );
  }
}

export default App;
