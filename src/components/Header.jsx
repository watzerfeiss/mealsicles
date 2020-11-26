import React from "react";
import PropTypes from "prop-types";

import { setView } from "../store/actions";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

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
