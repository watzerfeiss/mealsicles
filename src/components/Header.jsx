import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SearchForm from "./SearchForm";
import { useMatchMedia } from "../hooks/use-match-media";

function Header({ dispatch }) {
  const narrowScreen = useMatchMedia("(max-width: 500px)");
  const [searching, setSearching] = useState(false);

  return (
    <header
      className={`app-header${searching ? " app-header--searching" : ""}`}
    >
      <h1
        className={`app-header__heading${
          narrowScreen && searching ? " visually-hidden" : ""
        }`}
      >
        <Link to="/">Mealsicles</Link>
      </h1>
      <SearchForm
        {...{ dispatch, compact: narrowScreen, searching, setSearching }}
      />
    </header>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(Header);
