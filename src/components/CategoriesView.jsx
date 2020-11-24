import React from "react";
import PropTypes from "prop-types";

import SelectionOptionsList from "./SelectionOptionsList";

import * as shapes from "../shapes";

export function CategoriesView({ dispatch, selectionTypes }) {
  return (
    <SelectionOptionsList {...{ dispatch, selectionTypes }} type="categories" />
  );
}

CategoriesView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(shapes.category),
};
