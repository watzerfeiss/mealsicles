import React, { useEffect } from "react";

import { setRandomMeal } from "../actions";

export default function MealOfTheDay({ dispatch, meal }) {
  useEffect(() => {
    dispatch(setRandomMeal());
  }, []);

  return meal ? (
    <article className="motd">
      <h2 className="motd__title">{`Meal of the day: ${meal.name}`}</h2>
      <img src={meal.thumbnail} alt={meal.name} className="motd__thumb" />
      <p className="motd_category">{meal.category}</p>
      <div className="motd-instructions">
        {meal.instructions.split(/[\r\n]+/).map((p, index) => (
          <p className="motd__desc" key={index}>
            {p}
          </p>
        ))}
      </div>
      <a href="" className="motd__details-link">
        Details
      </a>
    </article>
  ) : null;
}
