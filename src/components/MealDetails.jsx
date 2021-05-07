import React, { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import * as shapes from "../shapes";

import {
  saveFavourite,
  deleteFavourites,
  setDisplayedMeal
} from "../store/actions";

import { useMatchMedia } from "../hooks/use-match-media";
import FavouriteButton from "./FavouriteButton";

export default function MealDetails({ dispatch, meal, favourites }) {
  const { mealId } = useParams();
  useEffect(() => {
    if (!meal || meal.id !== mealId) {
      dispatch(setDisplayedMeal(mealId));
    }
  }, [mealId]);

  const isNarrowScreen = useMatchMedia("(max-width: 500px)");

  const isFavourite = useMemo(
    () => Boolean(favourites.find((fave) => fave.id === mealId)),
    [mealId, favourites]
  );

  const onFavouriteClicked = useCallback(
    () =>
      dispatch(isFavourite ? deleteFavourites([mealId]) : saveFavourite(meal)),
    [meal, isFavourite]
  );

  return meal && mealId === meal.id ? (
    <article className="meal-details">
      <header className="meal-details-header">
        <h2 className="meal-details__title">{meal.name}</h2>
        {meal.tags && (
          <span className="meal-details__tags">
            Tags: {meal.tags.join(", ")}
          </span>
        )}
        <FavouriteButton
          className="meal-details__fave-btn"
          isFavourite={isFavourite}
          showText={!isNarrowScreen}
          onClick={onFavouriteClicked}
        />
      </header>
      <img
        src={meal.image}
        alt={meal.name}
        className="meal-details__image"
        width="100"
        height="100"
      />
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
  favourites: PropTypes.arrayOf(shapes.favourite)
};
