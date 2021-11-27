import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { loadSelectionOptions } from "../store/actions";
import shuffle from "../utils/shuffle";
import * as shapes from "../shapes";

import SelectionOptionsList from "./SelectionOptionsList";

export default function SelectionOptionsPreview({
  dispatch,
  type,
  selectionTypes,
  numItems = 3
}) {
  useEffect(() => {
    if (!selectionTypes || !selectionTypes[type]) {
      dispatch(loadSelectionOptions(type));
    }
  }, [selectionTypes, type]);

  if (!selectionTypes || !selectionTypes[type]) {
    return null;
  }

  let options = selectionTypes ? selectionTypes[type] : [];
  options = shuffle(options).slice(0, numItems);

  return (
    <div className="selection-options-preview">
      <SelectionOptionsList {...{ type, options }} />
      <Link to={type} className="page-link all-options-link">
        See all {type}
      </Link>
    </div>
  );
}

SelectionOptionsPreview.propTypes = {
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
