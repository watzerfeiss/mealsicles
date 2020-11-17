import React, { useCallback, useReducer, useMemo } from "react";

import Header from "./Header";

import rootReducer from "../reducers";
import * as actions from "../actions";
import withThunks from "../dispatch-with-thunks";

export default function App() {
  const [store, dispatch] = useReducer(rootReducer, {});
  const asyncDispatch = useMemo(() => withThunks(dispatch));

  const onGetRandomMeal = useCallback(() =>
    asyncDispatch(actions.setRandomMeal(), [])
  );
  const onSearch = useCallback(
    (term) => asyncDispatch(actions.search(term)),
    []
  );

  return (
    <div className="app-container">
      <Header onSearch={onSearch} />
      {store.search && store.search.term && (
        <>
          <p>Search results for {store.search.term}</p>
          <ul>
            {store.search.results?.map((meal) => (
              <li key={meal.id}>{meal.name}</li>
            ))}
          </ul>
        </>
      )}
      <button onClick={onGetRandomMeal}>Get random meal</button>
      {store.randomMeal && (
        <div className="meal">
          <h2 className="meal-name">{store.randomMeal.name}</h2>
          <img src={store.randomMeal.thumbnail} alt={store.randomMeal.name} />
          <div className="meal-instructions">
            {store.randomMeal.instructions.split(/[\r\n]/).map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
          <table>
            <tbody>
              {store.randomMeal.ingredients.map((ing) => (
                <tr key={ing.index}>
                  <td>{ing.ingredient}</td>
                  <td>{ing.measure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
