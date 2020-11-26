import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as shapes from "../shapes";

export default function CategoryCard({
  category: { id, name, image, description },
}) {
  return (
    <article className="category-card">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{description}</p>
      <Link to={`category/${name}`}>See meals in this category</Link>
    </article>
  );
}

CategoryCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  category: shapes.category,
};
