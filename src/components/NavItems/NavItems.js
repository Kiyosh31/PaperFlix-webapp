import React from "react";
import "./NavItems.css";

import NavItem from "components/NavItem/NavItem";

const NavItems = () => {
  return (
    <ul className="nav__items">
      <NavItem link="/home" active>
        Inicio
      </NavItem>
      <NavItem link="/asdasda">Ciencia</NavItem>
      <NavItem link="/hola">Mi lista</NavItem>
    </ul>
  );
};

export default NavItems;
