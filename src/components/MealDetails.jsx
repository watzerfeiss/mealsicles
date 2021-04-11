import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import * as shapes from "../shapes";

import { setDisplayedMeal } from "../store/actions";
import { saveFavourite } from "../store/actions";

export default function MealDetails({ dispatch, meal }) {
  const { mealId } = useParams();
  useEffect(() => {
    if (!meal || meal.id !== mealId) {
      dispatch(setDisplayedMeal(mealId));
    }
  }, [mealId]);

  return meal && mealId === meal.id ? (
    <article className="meal-details">
      <header className="meal-details-header">
        <h2 className="meal-details__title">{meal.name}</h2>
        <button
          type="button"
          onClick={() => {
            dispatch(saveFavourite(meal));
          }}
        >
          Add to favourites
        </button>
      </header>
      <img src={meal.image} alt={meal.name} className="meal-details__image" />
      <div className="meal-details__tags"></div>
      <div className="meal-ingredients">
        <table>
          <caption>Ingredients</caption>
          <tbody>
            {meal.ingredients.map((ing, index) => (
              <tr key={index}>
                <td>{ing.ingredient}</td>
                <td>{ing.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="meal-instructions">
        {meal.instructions.split(/[\r\n]+/).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    </article>
  ) : null;
}

MealDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  meal: shapes.meal,
};
