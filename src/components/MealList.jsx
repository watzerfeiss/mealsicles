import React from "react";
import PropTypes from "prop-types";

import * as shapes from "../shapes";

import MealCard from "./MealCard";

export default function MealList({ dispatch, meals, motdId }) {
  return (
    <ul className="meal-list">
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealCard {...{ dispatch, meal, isMotd: motdId === meal.id }} />
        </li>
      ))}
    </ul>
  );
}

MealList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meals: shapes.mealList
};
