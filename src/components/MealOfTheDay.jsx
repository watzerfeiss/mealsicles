import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { setMealOfTheDay } from "../store/actions";
import * as shapes from "../shapes";
import { Link } from "react-router-dom";

export default function MealOfTheDay({ dispatch, meal }) {
  useEffect(() => {
    dispatch(setMealOfTheDay());
  }, []);

  return meal ? (
    <article className="motd">
      <h2 className="motd__title">{`Meal of the day: ${meal.name}`}</h2>
      <img
        src={meal.image}
        alt={meal.name}
        className="motd__thumb"
        width="100"
        height="100"
      />
      <p className="motd_category">Category: {meal.category}</p>

      <Link to={`/meal-details/${meal.id}`} className="page-link motd__link">
        Details
      </Link>
    </article>
  ) : null;
}

MealOfTheDay.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meal: shapes.meal
};
