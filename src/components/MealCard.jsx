import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import * as shapes from "../shapes";

import MotdBadge from "./MotdBadge";

export default function MealCard({ meal, isMotd = false }) {
  return (
    <article className="meal-card">
      <h3 className="meal-card__title">{meal.name}</h3>
      {isMotd && <MotdBadge className="meal-card__motd-badge" />}
      <img
        className="meal-card__image"
        src={meal.thumbnail}
        alt={meal.name}
        width="10"
        height="10"
      />
      <Link
        to={`/meal-details/${meal.id}`}
        className="page-link meal-card__link"
      >
        Details
      </Link>
    </article>
  );
}

MealCard.propTypes = {
  meal: shapes.meal.isRequired,
  isMotd: PropTypes.bool
};
