import React, { useEffect } from "react";
import PropTypes from "prop-types";

import CategoryCard from "./CategoryCard";

import { loadSelectionOptions, setView } from "../actions";
import * as shapes from "../shapes";

export default function SelectionOptionsList({
  dispatch,
  type,
  selectionTypes,
  isPreview = false,
  numItems = 3,
}) {
  useEffect(() => {
    if (!selectionTypes || !selectionTypes[type]) {
      dispatch(loadSelectionOptions(type));
    }
  }, [selectionTypes]);

  const options = selectionTypes && selectionTypes[type];
  const numItemsToShow = isPreview ? numItems : options?.length;

  //todo shuffle
  return (
    <div className={`${type}${isPreview ? ` ${type}--preview` : ""}`}>
      {options ? (
        <ul className={"category-list"}>
          {options.slice(0, numItemsToShow).map((option) => {
            let item = null;
            switch (type) {
              case "categories":
                item = <CategoryCard {...{ dispatch, category: option }} />;
                break;
              case "areas":
                item = <a href="">{option.name}</a>;
                break;
            }

            return <li key={option.id || option.name}>{item}</li>;
          })}
        </ul>
      ) : null}
      {isPreview && (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            dispatch(setView("categories"));
          }}
        >
          See all {type}
        </a>
      )}
    </div>
  );
}

// this component is something else. Not sure whether in a bad or good way.

SelectionOptionsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectionTypes: PropTypes.shape({
    categories: PropTypes.arrayOf(shapes.category),
    areas: PropTypes.arrayOf(PropTypes.any),
    ingredients: PropTypes.arrayOf(PropTypes.any),
  }),
  numItems: PropTypes.number,
  isPreview: PropTypes.bool,
};
