import React from "react";
import PropTypes from "prop-types";

import * as shapes from "../shapes";

import CategoryList from "./CategoryList";
import AreaList from "./AreaList";
import IngredientList from "./IngredientList";

export default function SelectionOptionsList({ type, options }) {
  if (!options || !type) {
    return null;
  }

  switch (type) {
    case "categories":
      return <CategoryList categories={options} />;
    case "areas":
      return <AreaList areas={options} />;
    case "ingredients":
      return <IngredientList ingredients={options} />;
    default:
      return null;
  }
}

SelectionOptionsList.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(shapes.category),
    PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired }))
  ]).isRequired
};
