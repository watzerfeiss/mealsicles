import React, { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

export default function SearchForm({
  isCompact = false,
  isSearching = false,
  setIsSearching
}) {
  const hist = useHistory();
  const [searchText, setSearchText] = useState("");

  const isOpen = !isCompact || isSearching;

  const searchField = useRef(null);
  useLayoutEffect(() => {
    if (isSearching) {
      searchField.current.focus();
    }
  }, [isSearching]);

  const submitBtnElement = (
    <button className="btn search-form__btn" type="submit" aria-label="Search">
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
  );

  const cancelBtnElement = (
    <button
      className="btn search-form__btn"
      type="button"
      onClick={() => setIsSearching(false)}
      aria-label="Cancel"
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
  );

  const startSearchBtnElement = (
    <button
      className="btn search-form__btn"
      type="button"
      onClick={() => setIsSearching(true)}
      aria-label="Search"
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
  );

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchText === "") {
          return;
        }
        hist.push(`/search/${searchText}`);
        searchField.current.blur();
        setIsSearching(false);
      }}
    >
      {isOpen && (
        <input
          className="text-field search-form__field"
          type="search"
          ref={searchField}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search by meal name"
        />
      )}
      {isOpen ? (
        <>
          {submitBtnElement}
          {isCompact && cancelBtnElement}
        </>
      ) : (
        startSearchBtnElement
      )}
    </form>
  );
}

SearchForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isCompact: PropTypes.bool,
  isSearching: PropTypes.bool,
  setIsSearching: PropTypes.func.isRequired
};
