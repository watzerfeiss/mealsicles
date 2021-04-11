import React from "react";
import { Route, Switch } from "react-router-dom";

import rootReducer from "../store/reducers";
import useAsyncStore from "../hooks/use-async-store";

import Header from "./Header";
import MainNav from "./MainNav";
import HomePage from "./HomePage";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";
import MealSelectionView from "./MealSelectionView";
import SelectionOptionsView from "./SelectionOptionsView";
import MealDetails from "./MealDetails";

export default function App() {
  const [state, dispatch] = useAsyncStore(rootReducer, {});

  return (
    <div className="app-container">
      <Header {...{ dispatch }} />
      <MainNav />
      <main className="main-content">
        <Switch>
          <Route path="/meal-details/:mealId">
            <MealDetails {...{ dispatch, meal: state.displayedMeal }} />
          </Route>

          <Route path="/search">
            <SearchView {...{ dispatch, searchState: state.search }} />
          </Route>

          <Route path="/favourites">
            <FavouritesView {...{ dispatch }} />
          </Route>

          <Route path="/:selectionType/:selectionTerm">
            <MealSelectionView {...{ dispatch, selection: state.selection }} />
          </Route>

          <Route path="/:selectionType">
            <SelectionOptionsView
              {...{ dispatch, selectionTypes: state.selectionTypes }}
            />
          </Route>

          <Route path="/">
            <HomePage {...{ dispatch, state }} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
