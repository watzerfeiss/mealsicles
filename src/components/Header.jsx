import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchForm from "./SearchForm";
import { useMatchMedia } from "../hooks/use-match-media";

function Header() {
  const isNarrowScreen = useMatchMedia("(max-width: 500px)");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header
      className={`app-header${isSearching ? " app-header--searching" : ""}`}
    >
      <h1
        className={`app-header__heading${
          isNarrowScreen && isSearching ? " visually-hidden" : ""
        }`}
      >
        <Link to="/">Mealsicles</Link>
      </h1>
      <SearchForm
        isCompact={isNarrowScreen}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
    </header>
  );
}

Header.propTypes = {};

export default React.memo(Header);
