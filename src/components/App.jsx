import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import useAsyncStore from "../hooks/use-async-store";
import rootReducer from "../store/reducers";
import initialState from "../store/initial-state";
import { loadFavourites } from "../store/actions";

import Header from "./Header";
import MainNav from "./MainNav";
import HomePage from "./HomePage";
import FavouritesView from "./FavouritesView";
import SearchView from "./SearchView";
import MealSelectionView from "./MealSelectionView";
import SelectionOptionsView from "./SelectionOptionsView";
import MealDetails from "./MealDetails";

export default function App() {
  const [state, dispatch] = useAsyncStore(rootReducer, initialState);

  useEffect(() => {
    dispatch(loadFavourites());
  }, []);

  return (
    <div className="app-container">
      <Header {...{ dispatch }} />
      <MainNav />
      <main className="main-content">
        <Switch>
          <Route path="/meal-details/:mealId">
            <MealDetails
              {...{
                dispatch,
                meal: state.displayedMeal,
                favourites: state.favourites
              }}
            />
          </Route>

          <Route path="/meal-details">
            <Redirect to="/" />
          </Route>

          <Route path="/search">
            <SearchView {...{ dispatch, searchState: state.search }} />
          </Route>

          <Route path="/favourites">
            <FavouritesView {...{ dispatch, favourites: state.favourites }} />
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
