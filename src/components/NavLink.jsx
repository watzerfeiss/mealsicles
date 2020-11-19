import React from "react";

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
