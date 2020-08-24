import React from "react";
import "./NavItem.css";

import { Link } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className="nav__item">
      <Link
        to={props.link}
        className={`nav__item-link ${props.active ? "active" : null}`}
      >
        {props.children}
      </Link>
    </li>
  );
};

export default NavItem;
