import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SearchableList from "./SearchableList";
import ShowMoreList from "./ShowMoreList";

export default function IngredientList({ ingredients }) {
  return (
    <SearchableList
      searchableItems={ingredients.map((ingr) => ({
        item: ingr,
        searchKey: ingr.name
      }))}
      render={(items) => (
        <ShowMoreList
          items={items}
          initialCount={30}
          increment={100}
          render={(items) => (
            <ul className="ingredients-list">
              {items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={`/ingredient/${item.name}`}
                    className="page-link ingr-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        />
      )}
    />
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired
};
