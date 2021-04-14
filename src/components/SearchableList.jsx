import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

export default function SearchableList({ searchableItems, render }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = useMemo(() => {
    return searchableItems
      .filter(({ searchKey }) =>
        searchKey.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(({ item }) => item);
  }, [searchableItems, searchTerm]);

  return (
    <div className="searchable-list">
      <div className="searchable-list__searchbar">
        <input
          type="search"
          className="searchable-list__search-field"
          value={searchTerm}
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </div>
      {render(filteredItems)}
    </div>
  );
}

SearchableList.propTypes = {
  searchableItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.any.isRequired,
      searchKey: PropTypes.string.isRequired
    })
  ).isRequired,
  render: PropTypes.func.isRequired
};
