import React from "react";
import PropTypes from "prop-types";

import NavLink from "./NavLink";

export default function MainNav({ dispatch, currentView }) {
  return (
    <nav className="app-nav">
      <ul>
        <li className="app-nav__item">
          <NavLink
            dispatch={dispatch}
            currentView={currentView}
            view="favourites"
            text="Favourites"
          />
        </li>
        <li className="app-nav__item">
          <NavLink
            dispatch={dispatch}
            currentView={currentView}
            view="categories"
            text="Categories"
          />
        </li>
        <li className="app-nav__item">
          <NavLink
            dispatch={dispatch}
            currentView={currentView}
            view="areas"
            text="Areas"
          />
        </li>
        <li className="app-nav__item">
          <NavLink
            dispatch={dispatch}
            currentView={currentView}
            view="ingredients"
            text="Ingredients"
          />
        </li>
      </ul>
    </nav>
  );
}

MainNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentView: PropTypes.string,
};
