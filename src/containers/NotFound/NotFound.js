import React, { Component } from "react";

import Header from "components/Header/Header";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Box from "components/Box/Box";
import { Link } from "react-router-dom";
import Footer from "components/Footer/Footer";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <Box>
          <Title>404 NOT FOUND</Title>
          <p style={{ color: "#fff" }}>
            The page you're looking for was not found
          </p>
          <Link to="/">
            <Button>Go to Login</Button>
          </Link>
        </Box>
        <Footer />
      </div>
    );
  }
}

export default NotFound;
