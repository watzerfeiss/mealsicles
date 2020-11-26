import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { search } from "../store/actions";

export default function SearchForm({ dispatch }) {
  const hist = useHistory();
  const [searchText, setSearchText] = useState("");
  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        hist.push("/search");
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
