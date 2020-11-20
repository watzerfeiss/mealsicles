import React from "react";
import PropTypes from "prop-types";

import { setView } from "../actions";

export default function NavLink({ dispatch, view, currentView, text }) {
  return (
    <a
      className={view === currentView ? "current-view" : ""}
      href={view}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setView(view));
      }}
    >
      {text}
    </a>
  );
}

NavLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  currentView: PropTypes.string,
  text: PropTypes.string,
};
