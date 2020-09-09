import React from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <div className="searchbar__container">
      <FontAwesomeIcon className="icon" icon={faSearch} />
    </div>
  );
};

export default SearchBar;
