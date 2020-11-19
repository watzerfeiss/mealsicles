import React, { useReducer, useMemo } from "react";

import Header from "./Header";
import MainNav from "./MainNav";
import MealOfTheDay from "./MealOfTheDay";
import MealDetails from "./MealDetails";

import rootReducer from "../reducers";
import withThunks from "../dispatch-with-thunks";
import MealList from "./MealList";

export default function App() {
  const [state, dispatch] = useReducer(rootReducer, {});
  const asyncDispatch = useMemo(() => withThunks(dispatch), []);

  let mainView = null;
  switch (state.currentView) {
    case "meal-details":
      mainView = state.displayedMeal && (
        <MealDetails meal={state.displayedMeal} />
      );
      break;
    case "search":
    case "favourites":
      mainView = (
        <MealList
          dispatch={dispatch}
          view={state.currentView}
          searchState={state.search}
        />
      );
      break;
    case "categories":
    case "ingredients":
    case "home":
    default:
      mainView = (
        <MealOfTheDay dispatch={asyncDispatch} meal={state.mealOfTheDay} />
      );
  }

  return (
    <div className="app-container">
      <Header dispatch={asyncDispatch} />
      <MainNav dispatch={asyncDispatch} currentView={state.currentView} />
      <main>{mainView}</main>
    </div>
  );
}
