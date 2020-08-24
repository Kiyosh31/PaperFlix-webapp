import React from "react";
import "./NavItems.css";

import NavItem from "components/NavItem/NavItem";
import Logo from "components/Logo/Logo";
import Avatar from "components/Avatar/Avatar";

const NavItems = () => {
  return (
    <ul className="nav__items">
      <NavItem>
        <Logo />
      </NavItem>
      <NavItem>
        <Avatar />
      </NavItem>
      <NavItem link="/home" active>
        Inicio
      </NavItem>
      <NavItem link="/home">Ciencia</NavItem>
    </ul>
  );
};

export default NavItems;
