import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import * as shapes from "../shapes";

import SelectionOptionsList from "./SelectionOptionsList";

export default function SelectionOptionsView({ dispatch, selectionTypes }) {
  const { selectionType: type } = useParams();

  return <SelectionOptionsList {...{ dispatch, type, selectionTypes }} />;
}

SelectionOptionsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectionTypes: PropTypes.shape({
    categories: PropTypes.arrayOf(shapes.category),
    areas: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
};
