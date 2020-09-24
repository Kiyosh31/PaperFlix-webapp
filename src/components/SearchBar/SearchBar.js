import React, { useState } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "components/SearchInput/SearchInput";

const SearchBar = (props) => {
  const [showBar, setShowBar] = useState(false);

  function showSearchBarHandler() {
    setShowBar(true);
  }

  function closeSearchBarHandler() {
    setShowBar(false);
    props.closeSearchBarHandler();
  }

  return (
    <div className="searchbar__container">
      {showBar ? (
        <div className="searchinput__container">
          <FontAwesomeIcon
            className="searchinput__icon"
            icon={faTimesCircle}
            onClick={closeSearchBarHandler}
          />
          <SearchInput
            placeholder="Buscar documentos"
            changed={props.searchBarChangedHandler}
          />
        </div>
      ) : (
        <FontAwesomeIcon
          className="search__icon"
          icon={faSearch}
          onClick={showSearchBarHandler}
        />
      )}
    </div>
  );
};

export default SearchBar;
