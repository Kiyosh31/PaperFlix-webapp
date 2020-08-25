import React from "react";
import "./NavItems.css";

import NavItem from "components/NavItem/NavItem";
import Logo from "components/Logo/Logo";
import Avatar from "components/Avatar/Avatar";

const NavItems = () => {
  return (
    <ul className="nav__items">
      <NavItem link="/home">
        <Logo />
      </NavItem>
      <NavItem link="/home">
        <Avatar />
      </NavItem>
      <NavItem link="/home" active>
        Inicio
      </NavItem>
      <NavItem link="/home">Ciencia</NavItem>
      <NavItem link="/home">Mi lista</NavItem>
    </ul>
  );
};

export default NavItems;
