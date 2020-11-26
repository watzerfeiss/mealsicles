import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import * as shapes from "../shapes";
import { selectMeals } from "../store/actions";

import MealList from "./MealList";

const headings = {
  category: (count, name) =>
    `${count} meal${count > 1 ? "s" : ""} in the ${name} category`,
  area: (count, name) => `${count} ${name} meal${count > 1 ? "s" : ""}`,
  ingredient: (count, name) =>
    `${count} meal${count > 1 ? "s" : ""} made with ${name}`,
};

export default function MealSelectionView({ dispatch, selection }) {
  const { selectionType: type, selectionTerm: term } = useParams();
  useLayoutEffect(() => {
    if (!selection || selection.type !== type || selection.term !== term) {
      dispatch(selectMeals(type, term));
    }
  }, [type, term, selection]);

  return (
    <div className="meal-selection">
      {selection?.results && (
        <>
          <h2>
            {headings[selection.type](selection.results.length, selection.term)}
          </h2>
          <MealList {...{ dispatch, meals: selection.results }} />
        </>
      )}
    </div>
  );
}

MealSelectionView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selection: PropTypes.shape({
    type: PropTypes.oneOf(["category", "area", "ingredient"]).isRequired,
    term: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(shapes.meal),
  }),
};
