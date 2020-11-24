import React, { useState } from "react";
import PropTypes from "prop-types";

import { search } from "../store/actions";

export default function SearchForm({ dispatch }) {
  const [searchText, setSearchText] = useState("");
  return (
    <form
      className="search-form"
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
  );
}

SearchForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
