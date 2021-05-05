import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as shapes from "../shapes";

export default function CategoryCard({
  category: { name, image, description },
  isExpanded = false
}) {
  return (
    <article
      className={`category-card${isExpanded ? " category-card--expanded" : ""}`}
    >
      <h2 className="category-card__title">{name}</h2>
      <img
        className="category-card__image"
        src={image}
        alt={name}
        width="320"
        height="200"
      />
      {isExpanded && (
        <>
          <p className="category-card__description">{description}</p>
          <Link to={`category/${name}`} className="page-link">
            See meals in this category
          </Link>
        </>
      )}
    </article>
  );
}

CategoryCard.propTypes = {
  category: shapes.category,
  isExpanded: PropTypes.bool
};
