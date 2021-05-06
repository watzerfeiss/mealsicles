import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import useAsyncStore from "../hooks/use-async-store";
import rootReducer from "../store/reducers";
import initialState from "../store/initial-state";
import { loadFavourites, setMealOfTheDay } from "../store/actions";

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
    dispatch(setMealOfTheDay());
  }, []);

  return (
    <>
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
            <SearchView
              {...{
                dispatch,
                searchState: state.search,
                motdId: state.mealOfTheDay?.id
              }}
            />
          </Route>

          <Route path="/favourites">
            <FavouritesView
              {...{
                dispatch,
                favourites: state.favourites,
                motdId: state.mealOfTheDay?.id
              }}
            />
          </Route>

          <Route path="/:selectionType/:selectionTerm">
            <MealSelectionView
              {...{
                dispatch,
                selection: state.selection,
                motdId: state.mealOfTheDay?.id
              }}
            />
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

      <footer className="app-footer">
        &copy; 2021 ppesterev <br />
        Site icon courtesy of <a href="https://twemoji.twitter.com/">Twemoji</a>
        , &copy; Twitter, Inc. under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a>
      </footer>
    </>
  );
}
