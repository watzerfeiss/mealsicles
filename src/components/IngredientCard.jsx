import React from "react";

import { Link } from "react-router-dom";

import * as shapes from "../shapes";

function IngredientCard({ ingredient }) {
  return (
    <Link to={`/ingredient/${ingredient.name}`} className="ingredient-card">
      <h3 className="ingredient-card__title">{ingredient.name}</h3>
      <img
        src={ingredient.thumbnail}
        alt={ingredient.name}
        width="100"
        height="100"
        className="ingredient-card__image"
      />
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: shapes.ingredient
};

export default IngredientCard;
