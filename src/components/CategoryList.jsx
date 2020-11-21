import React, { useEffect } from "react";
import PropTypes from "prop-types";

import CategoryCard from "./CategoryCard";

import { loadCategories, displayCategories } from "../actions";
import * as shapes from "../shapes";

export default function CategoryList({
  dispatch,
  categories,
  isPreview = false,
  numItems = 3,
}) {
  useEffect(() => {
    if (!categories) {
      dispatch(loadCategories());
    }
  }, [categories]);

  const numItemsToShow = isPreview ? numItems : categories?.length;

  //todo shuffle
  return (
    <div
      className={`category-list${isPreview ? " category-list--preview" : ""}`}
    >
      {categories ? (
        <ul className={"categories-preview"}>
          {categories.slice(0, numItemsToShow).map((cat) => (
            <li key={cat.id}>
              <CategoryCard {...{ dispatch, category: cat }} />
            </li>
          ))}
        </ul>
      ) : null}
      {isPreview && (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            dispatch(displayCategories());
          }}
        >
          See all categories
        </a>
      )}
    </div>
  );
}

CategoryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(shapes.category),
  numItems: PropTypes.number,
  isPreview: PropTypes.bool,
};
