import React from "react";
import PropTypes from "prop-types";

import SearchableList from "./SearchableList";
import ShowMoreList from "./ShowMoreList";
import IngredientCard from "./IngredientCard";

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
                  <IngredientCard ingredient={item} />
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
