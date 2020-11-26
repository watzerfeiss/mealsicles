import React from "react";
import { Link } from "react-router-dom";

import * as shapes from "../shapes";

export default function MealCard({ meal }) {
  return (
    <article className="meal-card">
      <h3 className="meal-card__title">{meal.name}</h3>
      <img src={meal.thumbnail} alt={meal.name} />
      <Link to={`/meal-details/${meal.id}`}>Details</Link>
    </article>
  );
}

MealCard.propTypes = {
  meal: shapes.meal.isRequired,
};
