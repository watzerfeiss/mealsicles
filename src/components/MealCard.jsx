import React from "react";
import PropTypes from "prop-types";

import { setDisplayedMeal } from "../store/actions";
import * as shapes from "../shapes";

export default function MealCard({ dispatch, meal }) {
  return (
    <article className="meal-card">
      <h3 className="meal-card__title">{meal.name}</h3>
      <img src={meal.thumbnail} alt={meal.name} />
      <a
        href={meal.id}
        onClick={(e) => {
          e.preventDefault();
          dispatch(setDisplayedMeal(meal.id));
        }}
      >
        Details
      </a>
    </article>
  );
}

MealCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meal: shapes.meal.isRequired,
};
