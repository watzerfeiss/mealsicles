import React from "react";
import PropTypes from "prop-types";
import MealOfTheDay from "./MealOfTheDay";

export default function HomePage({ dispatch, motd }) {
  return <MealOfTheDay dispatch={dispatch} meal={motd} />;
}
