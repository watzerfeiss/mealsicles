import React from "react";
import PropTypes from "prop-types";

import { setDisplayedMeal } from "../store/actions";
import * as shapes from "../shapes";
import { Link } from "react-router-dom";

export default function MealCard({ dispatch, meal }) {
  return (
    <article className="meal-card">
      <h3 className="meal-card__title">{meal.name}</h3>
      <img src={meal.thumbnail} alt={meal.name} />
      <Link to={`/meal-details/${meal.id}`}>Details</Link>
    </article>
  );
}

MealCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meal: shapes.meal.isRequired,
};
