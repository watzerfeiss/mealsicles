import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { favourite } from "../shapes";

export default function FavouriteCard({ dispatch, favourite, onUnfavourite }) {
  const { timestamp, meal } = favourite;
  const date = new Date(timestamp);

  return (
    <article className="meal-card">
      <h3 className="meal-card__title">{meal.name}</h3>
      <p>
        Favourited on{" "}
        <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>{" "}
      </p>
      <img
        className="meal-card__image"
        src={meal.thumbnail}
        alt={meal.name}
        width="10"
        height="10"
      />
      <Link to={`/meal-details/${meal.id}`} className="page-link">
        Details
      </Link>
      <button className="page-link" onClick={onUnfavourite}>
        Remove from favourites
      </button>
    </article>
  );
}

FavouriteCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favourite,
  onUnfavourite: PropTypes.func.isRequired
};
