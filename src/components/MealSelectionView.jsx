import React from "react";
import PropTypes from "prop-types";

import MealCard from "./MealCard";

import * as shapes from "../shapes";

const headings = {
  category: (count, name) =>
    `${count} meal${count > 1 ? "s" : ""} in the ${name} category`,
  area: (count, name) => `${count} ${name} meal${count > 1 ? "s" : ""}`,
  ingredient: (count, name) =>
    `${count} meal${count > 1 ? "s" : ""} made with ${name}`,
};

export default function MealSelectionView({
  dispatch,
  selection: { type, term, results },
}) {
  return (
    <div className="meal-selection">
      {results && (
        <>
          <h2>{headings[type](results.length, term)}</h2>
          <ul>
            {results.map((meal) => (
              <li key={meal.id}>
                <MealCard {...{ dispatch, meal }} />
              </li>
            ))}
          </ul>
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
