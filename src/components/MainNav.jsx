import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

export default function MainNav({ dispatch, currentView }) {
  return (
    <nav className="app-nav">
      <ul>
        <li className="app-nav__item">
          <NavLink to="/favourites" activeClassName="current-view">
            Favourites
          </NavLink>
        </li>
        <li className="app-nav__item">
          <NavLink to="/categories" activeClassName="current-view">
            Categories
          </NavLink>
        </li>
        <li className="app-nav__item">
          <NavLink to="/areas" activeClassName="current-view">
            Areas
          </NavLink>
        </li>
        <li className="app-nav__item">
          <NavLink to="/ingredients" activeClassName="current-view">
            Ingredients
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

MainNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentView: PropTypes.string,
};
