import React, { useReducer, useMemo } from "react";

import Header from "./Header";
import MainNav from "./MainNav";
import MealOfTheDay from "./MealOfTheDay";
import MealDetails from "./MealDetails";

import rootReducer from "../reducers";
import withThunks from "../dispatch-with-thunks";
import SearchView from "./SearchView";
import HomePage from "./HomePage";
import { CategoriesView } from "./CategoriesView";
import MealSelectionView from "./MealSelectionView";

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
      mainView = <SearchView {...{ dispatch, searchState: state.search }} />;
      break;
    case "selection":
      mainView = (
        <MealSelectionView {...{ dispatch, selection: state.selection }} />
      );
      break;
    case "favourites":
    case "categories":
    case "areas":
    case "ingredients":
      mainView = (
        <CategoriesView {...{ dispatch, categories: state.categories }} />
      );
      break;
    case "home":
    default:
      mainView = <HomePage {...{ dispatch, state }} />;
  }

  return (
    <div className="app-container">
      <Header dispatch={dispatch} />
      <MainNav {...{ dispatch, currentView: state.currentView }} />
      <main>{mainView}</main>
    </div>
  );
}
