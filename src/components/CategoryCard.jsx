import React from "react";
import PropTypes from "prop-types";

import { selectMeals } from "../actions";
import * as shapes from "../shapes";

export default function CategoryCard({
  dispatch,
  category: { id, name, image, description },
}) {
  return (
    <article className="category-card">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{description}</p>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          dispatch(selectMeals("category", name));
        }}
      >
        See meals in this category
      </a>
    </article>
  );
}

CategoryCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  category: shapes.category,
};