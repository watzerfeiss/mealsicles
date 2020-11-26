import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SearchForm from "./SearchForm";

function Header({ dispatch }) {
  return (
    <header className="app-header">
      <h1>
        <Link to="/">Mealsicles</Link>
      </h1>
      <SearchForm {...{ dispatch }} />
    </header>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(Header);
