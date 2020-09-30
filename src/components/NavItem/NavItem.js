import React from "react";
import "./NavItem.css";

import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className="nav__item">
      <NavLink to={props.link} className="nav__item-link">
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
