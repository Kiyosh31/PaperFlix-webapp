import React from "react";
import "./Logo.css";

import logo from "assets/img/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo__container">
      <Link to="/home">
        <img src={logo} alt="Paperflix-logo" />
      </Link>
    </div>
  );
};

export default Logo;
