import React from "react";
import "./NavItem.css";

import { Link } from "react-router-dom";

const NavItem = (props) => {
  return <Link to={props.to}>{props.children}</Link>;
};

export default NavItem;
