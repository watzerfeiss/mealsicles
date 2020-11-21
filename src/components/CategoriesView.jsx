import React from "react";
import PropTypes from "prop-types";

import CategoryList from "./CategoryList";

import * as shapes from "../shapes";

export function CategoriesView({ dispatch, categories }) {
  return <CategoryList {...{ dispatch, categories }} />;
}

CategoriesView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(shapes.category),
};
