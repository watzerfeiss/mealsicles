import React from "react";
import PropTypes from "prop-types";

import { setView } from "../actions";
import SearchForm from "./SearchForm";

function Header({ dispatch }) {
  return (
    <header className="app-header">
      <h1>
        <a
          href="home"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setView("home"));
          }}
        >
          Mealsicles
        </a>
      </h1>
      <SearchForm {...{ dispatch }} />
    </header>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(Header);
