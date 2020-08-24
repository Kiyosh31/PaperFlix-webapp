import React from "react";
import "./Logo.css";

import logo from "assets/img/logo.png";

const Logo = () => {
  return (
    <div>
      <img className="logo" src={logo} alt="Paperflix-logo" />
    </div>
  );
};

export default Logo;
