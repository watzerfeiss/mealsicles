import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { favourite } from "../shapes";
import FavouriteButton from "./FavouriteButton";

export default function FavouriteCard({ favourite, onUnfavourite }) {
  const { timestamp, meal } = favourite;
  const date = new Date(timestamp);

  return (
    <article className="favourite-card">
      <h3 className="favourite-card__title">{meal.name}</h3>
      <p className="favourite-card__info">
        Favourited on{" "}
        <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>{" "}
      </p>
      <img
        className="favourite-card__image"
        src={meal.thumbnail}
        alt={meal.name}
        width="10"
        height="10"
      />
      <Link
        to={`/meal-details/${meal.id}`}
        className="page-link favourite-card__link"
      >
        Details
      </Link>
      <FavouriteButton
        className="favourite-card__fave-btn"
        isFavourite={true}
        showText={false}
        onClick={onUnfavourite}
      />
    </article>
  );
}

FavouriteCard.propTypes = {
  favourite,
  onUnfavourite: PropTypes.func.isRequired
};
