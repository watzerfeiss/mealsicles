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

  return (
    <div className="app-container">
      <Header dispatch={asyncDispatch} />
      <MainNav />
      <MealOfTheDay dispatch={asyncDispatch} meal={state.randomMeal} />
      {state.displayedMeal && <MealDetails meal={state.displayedMeal} />}
      {state.search?.term && (
        <>
          <p>Search results for {state.search.term}</p>
          <ul>
            {state.search.results?.map((meal) => (
              <li key={meal.id}>{meal.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
