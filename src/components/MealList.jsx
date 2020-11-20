import React from "react";
import PropTypes from "prop-types";

import MealCard from "./MealCard";

import * as shapes from "../shapes";

export default function MealList({ dispatch, meals }) {
  return (
    <ul className="meal-list">
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealCard {...{ dispatch, meal }} />
        </li>
      ))}
    </ul>
  );
}

MealList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meals: shapes.mealList,
};
