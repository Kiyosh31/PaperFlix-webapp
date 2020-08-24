import React, { useEffect, useState } from "react";
import "./Toolbar.css";

import Logo from "components/Logo/Logo";
import Avatar from "components/Avatar/Avatar";

const Toolbar = () => {
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
    // <div className={`nav ${scrolled && "nav__black"}`}>
    //   <img className="nav__logo" src={logo} alt="Paperflix-logo" />
    //   <img className="nav__avatar" src={avatar} alt="Paperflix-avatar" />
    // </div>
    <header className={`toolbar ${scrolled && "toolbar__black"}`}>
      <Logo />
      <Avatar />
      <nav></nav>
    </header>
  );
};

export default Toolbar;
