import React, { useCallback } from "react";
import PropTypes from "prop-types";

import MealCard from "./MealCard";

import * as shapes from "../shapes";
import { setDisplayedMeal } from "../actions";

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
