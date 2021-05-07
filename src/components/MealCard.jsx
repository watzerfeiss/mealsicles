import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import * as shapes from "../shapes";

import MotdBadge from "./MotdBadge";

export default function MealCard({ meal, isMotd = false }) {
  return (
    <article className="meal-card">
      <header className="meal-card__header">
        <h3 className="meal-card__title">{meal.name}</h3>
        {isMotd && <MotdBadge className="meal-card__motd-badge" />}
      </header>
      <img
        className="meal-card__image"
        src={meal.thumbnail}
        alt={meal.name}
        width="100"
        height="100"
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
