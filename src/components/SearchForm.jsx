import React, { useLayoutEffect, useRef, useState } from "react";
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

  const searchField = useRef(null);
  useLayoutEffect(() => {
    if (searching) {
      searchField.current.focus();
    }
  }, [searching]);

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchText === "") {
          return;
        }
        hist.push("/search");
        dispatch(search(searchText));
        searchField.current.blur();
        setSearching(false);
      }}
    >
      {isOpen && (
        <input
          className="search-form__field"
          type="search"
          ref={searchField}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      {isOpen ? (
        <>
          <button className="btn search-form__btn" type="submit" value="Search">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {compact && (
            <button
              className="btn search-form__btn"
              type="button"
              onClick={() => setSearching(false)}
              value="Cancel"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </>
      ) : (
        <button
          className="btn search-form__btn"
          type="button"
          onClick={() => setSearching(true)}
          value="Search"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
    </form>
  );
}

SearchForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
