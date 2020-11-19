import React, { useReducer, useMemo } from "react";

import Header from "./Header";
import MainNav from "./MainNav";
import MealOfTheDay from "./MealOfTheDay";
import MealDetails from "./MealDetails";

import rootReducer from "../reducers";
import withThunks from "../dispatch-with-thunks";

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
    case "categories":
    case "ingredients":
    case "home":
    default:
      mainView = (
        <MealOfTheDay dispatch={asyncDispatch} meal={state.randomMeal} />
      );
  }

  return (
    <div className="app-container">
      <Header dispatch={asyncDispatch} />
      <MainNav dispatch={asyncDispatch} currentView={state.currentView} />
      <main>{mainView}</main>
      {/* {state.search?.term && (
        <>
          <p>Search results for {state.search.term}</p>
           <ul>
            {state.search.results?.map((meal) => (
              <li key={meal.id}>{meal.name}</li>
            ))}
          </ul> 
        </>
      )} */}
    </div>
  );
}
