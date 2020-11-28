import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as shapes from "../shapes";

export default function CategoryCard({
  category: { id, name, image, description },
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`category-card${expanded ? " category-card--expanded" : ""}`}
      onClick={(e) => {
        setExpanded(!expanded);
      }}
    >
      <h2>{name}</h2>
      <img
        className="category-card__image"
        src={image}
        alt={name}
        width="320"
        height="200"
      />
      {expanded && (
        <>
          <p>{description}</p>
          <Link to={`category/${name}`}>See meals in this category</Link>
        </>
      )}
    </article>
  );
}

CategoryCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  category: shapes.category,
};
