import React from "react";
import PropTypes from "prop-types";

import { selectMeals } from "../store/actions";
import * as shapes from "../shapes";
import { Link } from "react-router-dom";

export default function CategoryCard({
  dispatch,
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
