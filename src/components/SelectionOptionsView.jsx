import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { loadSelectionOptions } from "../store/actions";
import * as shapes from "../shapes";

import SelectionOptionsList from "./SelectionOptionsList";

export default function SelectionOptionsView({ dispatch, selectionTypes }) {
  const { selectionType: type } = useParams();
  useEffect(() => {
    if (!selectionTypes || !selectionTypes[type]) {
      dispatch(loadSelectionOptions(type));
    }
  }, [selectionTypes, type]);

  let options = selectionTypes ? selectionTypes[type] : [];

  return <SelectionOptionsList {...{ type, options }} />;
}

SelectionOptionsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
  })
};
