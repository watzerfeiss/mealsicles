import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { loadSelectionOptions } from "../store/actions";
import * as shapes from "../shapes";

import CategoryCard from "./CategoryCard";
import IngredientList from "./IngredientList";
import Modal from "./Modal";

export default function SelectionOptionsList({
  dispatch,
  type,
  selectionTypes,
  isPreview = false,
  numItems = 3
}) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    if (!selectionTypes || !selectionTypes[type]) {
      dispatch(loadSelectionOptions(type));
    }
  }, [selectionTypes, type]);

  const options = selectionTypes ? selectionTypes[type] : null;

  if (options && type === "ingredients") {
    return (
      <div className="ingredients">
        <IngredientList ingredients={options} />
      </div>
    );
  }

  //todo shuffle
  const numItemsToShow = isPreview ? numItems : options?.length;
  return (
    <div className={`${type}${isPreview ? ` ${type}--preview` : ""}`}>
      {options && (
        <ul className={`${type}-list`}>
          {options.slice(0, numItemsToShow).map((option) => {
            let item = null;
            switch (type) {
              case "categories":
                item = (
                  <a
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setExpandedCategory(option);
                    }}
                  >
                    <CategoryCard category={option} />
                  </a>
                );
                break;
              case "areas":
                item = (
                  <Link to={`/area/${option.name}`} className="area-link">
                    {option.name}
                  </Link>
                );
                break;
            }

            return <li key={option.id || option.name}>{item}</li>;
          })}
        </ul>
      )}
      {isPreview && (
        <Link to={type} className="page-link all-options-link">
          See all {type}
        </Link>
      )}
      {expandedCategory && (
        <Modal onClose={() => setExpandedCategory(null)}>
          <CategoryCard category={expandedCategory} isExpanded />
        </Modal>
      )}
    </div>
  );
}

// this component is something else. Not sure whether in a bad or good way.

SelectionOptionsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selectionTypes: PropTypes.shape({
    categories: PropTypes.arrayOf(shapes.category),
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    ),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    )
  }),
  numItems: PropTypes.number,
  isPreview: PropTypes.bool
};
