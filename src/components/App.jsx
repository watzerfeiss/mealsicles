import React from "react";
import { Route, Switch } from "react-router-dom";

import rootReducer from "../store/reducers";
import useAsyncStore from "../hooks/use-async-store";

import Header from "./Header";
import MainNav from "./MainNav";
import HomePage from "./HomePage";
import SearchView from "./SearchView";
import MealSelectionView from "./MealSelectionView";
import SelectionOptionsView from "./SelectionOptionsView";
import MealDetails from "./MealDetails";

export default function App() {
  const [state, dispatch] = useAsyncStore(rootReducer, {});

  // let mainView = null;
  // switch (state.currentView) {
  //   case "meal-details":
  //     mainView = state.displayedMeal && (
  //       <MealDetails meal={state.displayedMeal} />
  //     );
  //     break;
  //   case "search":
  //     mainView = <SearchView {...{ dispatch, searchState: state.search }} />;
  //     break;
  //   case "selection":
  //     mainView = (
  //       <MealSelectionView {...{ dispatch, selection: state.selection }} />
  //     );
  //     break;
  //   case "favourites":
  //     break;
  //   case "categories":
  //     mainView = (
  //       <CategoriesView
  //         {...{ dispatch, selectionTypes: state.selectionTypes }}
  //       />
  //     );
  //     break;
  //   case "areas":
  //     mainView = (
  //       <SelectionOptionsList
  //         {...{ dispatch, selectionTypes: state.selectionTypes, type: "areas" }}
  //       />
  //     );
  //     break;
  //   case "ingredients":
  //     mainView = (
  //       <SelectionOptionsList
  //         {...{
  //           dispatch,
  //           selectionTypes: state.selectionTypes,
  //           type: "ingredients",
  //         }}
  //       />
  //     );
  //     break;
  //   case "home":
  //   default:
  //     mainView = <HomePage {...{ dispatch, state }} />;
  // }

  return (
    <div className="app-container">
      <Header {...{ dispatch }} />
      <MainNav />
      <Switch>
        <Route path="/meal-details/:mealId">
          <MealDetails {...{ dispatch, meal: state.displayedMeal }} />
        </Route>

        <Route path="/search">
          <SearchView {...{ dispatch, searchState: state.search }} />
        </Route>

        <Route path="/favourites" />

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
    </div>
  );
}
