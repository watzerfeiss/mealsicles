import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { setDisplayedMeal, setMealOfTheDay } from "../store/actions";
import * as shapes from "../shapes";
import { Link } from "react-router-dom";

export default function MealOfTheDay({ dispatch, meal }) {
  useEffect(() => {
    dispatch(setMealOfTheDay());
  }, []);

  return meal ? (
    <article className="motd">
      <h2 className="motd__title">{`Meal of the day: ${meal.name}`}</h2>
      <img src={meal.thumbnail} alt={meal.name} className="motd__thumb" />
      <p className="motd_category">{meal.category}</p>

      <Link to={`/meal-details/${meal.id}`}>Details</Link>
    </article>
  ) : null;
}
