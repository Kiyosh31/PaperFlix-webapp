import React from "react";
import "./Header.css";

import Logo from "assets/img/logo.png";

const Header = () => {
  return (
    <header className="header__container">
      <div className="">
        <img className="header__logo" src={Logo} alt="" />
      </div>
    </header>
  );
};

export default Header;
