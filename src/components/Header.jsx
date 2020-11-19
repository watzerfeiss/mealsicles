import React, { useState } from "react";

import { search, setView } from "../actions";

function Header({ dispatch }) {
  const [searchText, setSearchText] = useState("");

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(search(searchText));
        }}
      >
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </header>
  );
}

export default React.memo(Header);
