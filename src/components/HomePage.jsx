import React from "react";
import PropTypes from "prop-types";

import MealOfTheDay from "./MealOfTheDay";
import SearchForm from "./SearchForm";

import * as shapes from "../shapes";
import CategoryList from "./CategoryList";

export default function HomePage({
  dispatch,
  state: { mealOfTheDay, categories },
}) {
  return (
    <>
      <section className="homepage-section">
        <MealOfTheDay dispatch={dispatch} meal={mealOfTheDay} />
      </section>

      <section className="homepage-section homepage-section--search">
        <SearchForm {...{ dispatch }} />
      </section>

      <section className="homepage-section">
        <h2>Meal categories</h2>
        <CategoryList {...{ dispatch, categories }} isPreview />
      </section>

      <section className="homepage-section">
        <h2>Areas of origin</h2>
        <p className="subheading">Meals from around the world</p>
      </section>
    </>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    mealOfTheDay: shapes.meal,
    categories: PropTypes.arrayOf(shapes.category),
  }),
};
