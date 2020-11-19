import React from "react";

export default function MealDetails({ meal }) {
  return meal ? (
    <article className="meal-details">
      <h2 className="meal-details__title">{meal.name}</h2>
      <img src={meal.image} alt={meal.name} className="meal-details__image" />
      <div className="meal-details__tags"></div>
      <div className="meal-ingredients">
        <table>
          <caption>Ingredients</caption>
          <tbody>
            {meal.ingredients.map((ing, index) => (
              <tr key={index}>
                <td>{ing.ingredient}</td>
                <td>{ing.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="meal-instructions">
        {meal.instructions.split(/[\r\n]+/).map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    </article>
  ) : null;
}
