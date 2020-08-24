import React, { useEffect, useState } from "react";
import "./NavBar.css";

import NavItem from "components/NavItem/NavItem";
import logo from "assets/img/logo.png";
import avatar from "assets/img/avatar.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 75) {
        setScrolled(true);
      } else setScrolled(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${scrolled && "nav__black"}`}>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/home">
                <img className="nav__logo" src={logo} alt="Paperflix-logo" />
              </NavLink>
              <NavLink to="/home">
                <img className="nav__logo" src={logo} alt="Paperflix-logo" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <img className="nav__avatar" src={avatar} alt="Paperflix-avatar" />
    </div>
  );
};

export default NavBar;
