import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { setDisplayedMeal, setMealOfTheDay, setView } from "../actions";
import * as shapes from "../shapes";

export default function MealOfTheDay({ dispatch, meal }) {
  useEffect(() => {
    dispatch(setMealOfTheDay());
  }, []);

  return meal ? (
    <article className="motd">
      <h2 className="motd__title">{`Meal of the day: ${meal.name}`}</h2>
      <img src={meal.thumbnail} alt={meal.name} className="motd__thumb" />
      <p className="motd_category">{meal.category}</p>

      <a
        href={meal.id}
        className="motd__details-link"
        onClick={(e) => {
          e.preventDefault();
          dispatch(setDisplayedMeal(meal.id));
        }}
      >
        Details
      </a>
    </article>
  ) : null;
}

MealOfTheDay.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meal: shapes.meal,
};
