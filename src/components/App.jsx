import React, { useReducer, useMemo } from "react";

import Header from "./Header";
import MainNav from "./MainNav";
import MealOfTheDay from "./MealOfTheDay";
import MealDetails from "./MealDetails";

import rootReducer from "../reducers";
import withThunks from "../dispatch-with-thunks";
import SearchView from "./SearchView";

export default function App() {
  const [state, _dispatch] = useReducer(rootReducer, {});
  const dispatch = useMemo(() => withThunks(_dispatch), []);

  let mainView = null;
  switch (state.currentView) {
    case "meal-details":
      mainView = state.displayedMeal && (
        <MealDetails meal={state.displayedMeal} />
      );
      break;
    case "search":
    case "favourites":
      mainView = <SearchView dispatch={dispatch} searchState={state.search} />;
      break;
    case "categories":
    case "ingredients":
    case "home":
    default:
      mainView = <MealOfTheDay dispatch={dispatch} meal={state.mealOfTheDay} />;
  }

  return (
    <div className="app-container">
      <Header dispatch={dispatch} />
      <MainNav dispatch={dispatch} currentView={state.currentView} />
      <main>{mainView}</main>
    </div>
  );
}
