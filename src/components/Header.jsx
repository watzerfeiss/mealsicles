import React, { useState } from "react";

function Header({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  return (
    <header className="app-header">
      <h1>Mealsicles</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(searchText);
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
