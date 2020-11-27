import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { search } from "../store/actions";

export default function SearchForm({
  dispatch,
  compact = false,
  searching = false,
  setSearching,
}) {
  const hist = useHistory();
  const [searchText, setSearchText] = useState("");

  const isOpen = !compact || searching;

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        hist.push("/search");
        dispatch(search(searchText));
      }}
    >
      {isOpen && (
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      {isOpen ? (
        <>
          <input type="submit" value="Search" />
          {compact && (
            <button
              type="button"
              onClick={() => setSearching(false)}
              value="Cancel"
            >
              x
            </button>
          )}
        </>
      ) : (
        <button type="button" onClick={() => setSearching(true)} value="Search">
          p
        </button>
      )}
    </form>
  );
}

SearchForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
