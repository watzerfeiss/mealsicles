import React from "react";
import { Link } from "react-router-dom";

import * as shapes from "../shapes";

export default function MealCard({ meal }) {
  return (
    <article className="meal-card">
      <h3 className="meal-card__title">{meal.name}</h3>
      <img
        className="meal-card__image"
        src={meal.thumbnail}
        alt={meal.name}
        width="10"
        height="10"
      />
      <Link to={`/meal-details/${meal.id}`}>Details</Link>
    </article>
  );
}

MealCard.propTypes = {
  meal: shapes.meal.isRequired,
};
