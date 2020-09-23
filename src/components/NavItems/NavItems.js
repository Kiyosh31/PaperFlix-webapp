import React from "react";
import "./NavItems.css";

import NavItem from "components/NavItem/NavItem";

const NavItems = () => {
  return (
    <ul className="nav__items">
      <NavItem link="/home" active>
        Inicio
      </NavItem>
      <NavItem link="/asdasda">Mas recientes</NavItem>
      <NavItem link="/asdasda">Tendencias</NavItem>
    </ul>
  );
};

export default NavItems;
