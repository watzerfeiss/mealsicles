import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

export default function SearchableList({ items, searchableValues, render }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = useMemo(() => {
    return searchableValues
      .filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((value, idx) => items[idx]);
  }, [items, searchableValues, searchTerm]);

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
  items: PropTypes.array.isRequired,
  searchableValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  render: PropTypes.func.isRequired
};
