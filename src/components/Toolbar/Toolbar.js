import React, { useEffect, useState } from "react";
import "./Toolbar.css";

import Logo from "components/Logo/Logo";
import Avatar from "components/Avatar/Avatar";
import NavItems from "components/NavItems/NavItems";

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
    <header className={`toolbar ${scrolled && "toolbar__black"}`}>
      {/* <Logo />
      <Avatar /> */}
      <nav>
        <NavItems />
      </nav>
    </header>
  );
};

export default Toolbar;
