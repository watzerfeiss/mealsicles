import React from "react";
import PropTypes from "prop-types";

import * as shapes from "../shapes";

import MealOfTheDay from "./MealOfTheDay";
import SelectionOptionsPreview from "./SelectionOptionsPreview";

export default function HomePage({
  dispatch,
  state: { mealOfTheDay, selectionTypes }
}) {
  return (
    <>
      <section className="homepage-section">
        <MealOfTheDay dispatch={dispatch} meal={mealOfTheDay} />
      </section>

      <section className="homepage-section">
        <h2 className="heading">Meal categories</h2>
        <SelectionOptionsPreview
          {...{ dispatch, selectionTypes }}
          type="categories"
        />
      </section>

      <section className="homepage-section">
        <h2 className="heading">Areas of origin</h2>
        <p className="subheading">Meals from around the world</p>
        <SelectionOptionsPreview
          {...{ dispatch, selectionTypes }}
          type="areas"
          numItems={5}
        />
      </section>
    </>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    mealOfTheDay: shapes.meal,
    selectionTypes: PropTypes.shape({
      categories: PropTypes.arrayOf(shapes.category),
      areas: PropTypes.arrayOf(PropTypes.any),
      ingredients: PropTypes.arrayOf(PropTypes.any)
    })
  })
};
