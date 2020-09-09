import React, { useEffect, useState } from "react";
import "./Toolbar.css";

import NavItems from "components/NavItems/NavItems";
import Logo from "components/Logo/Logo";
import Avatar from "components/Avatar/Avatar";
import SearchBar from "components/SearchBar/SearchBar";

const Toolbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      window.pageYOffset > 75 ? setScrolled(true) : setScrolled(false);

    const onScroll = window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`toolbar ${scrolled && "toolbar__black"}`}>
      <Logo />
      <div>
        <NavItems />
      </div>
      <nav>
        <SearchBar />
        <Avatar />
      </nav>
    </header>
  );
};

export default Toolbar;
