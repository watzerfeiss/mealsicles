import React, { useState, useCallback } from "react";

import Header from "./Header";

import { getRandomMeal, search } from "../api";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [randomMeal, setRandomMeal] = useState(null);

  const onGetRandomMeal = useCallback(() => {
    getRandomMeal()
      .then((meal) => {
        setRandomMeal(meal);
      })
      .catch(console.log);
  }, []);

  const onSearch = useCallback((term) => {
    setSearchTerm(term);
    search(term)
      .then((results) => {
        setSearchResults(results);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="app-container">
      <Header onSearch={onSearch} />
      {searchTerm && (
        <>
          <p>Search results for {searchTerm}</p>
          <ul>
            {searchResults.map((meal) => (
              <li key={meal.id}>{meal.name}</li>
            ))}
          </ul>
        </>
      )}
      <button onClick={onGetRandomMeal}>Get random meal</button>
      {randomMeal && (
        <div className="meal">
          <h2 className="meal-name">{randomMeal.name}</h2>
          <img src={randomMeal.thumbnail} alt={randomMeal.name} />
          <div className="meal-instructions">
            {randomMeal.instructions.split(/[\r\n]/).map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
          <table>
            <tbody>
              {randomMeal.ingredients.map((ing) => (
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
