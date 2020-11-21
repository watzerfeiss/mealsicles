import React from "react";
import PropTypes from "prop-types";

import MealCard from "./MealCard";

import * as shapes from "../shapes";

const headings = {
  category: (name) => `Meals in the ${name} category`,
  area: (name) => `Meals from the ${name} area`,
  ingredient: (name) => `Meals made with ${name}`,
};

export default function MealSelectionView({
  dispatch,
  selection: { type, term, results },
}) {
  return (
    <div className="meal-selection">
      <h2>{headings[type](term)}</h2>
      {results && (
        <ul>
          {results.map((meal) => (
            <li key={meal.id}>
              <MealCard {...{ dispatch, meal }} />
            </li>
          ))}
        </ul>
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
