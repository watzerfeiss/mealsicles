import React, { useState } from "react";

import Header from "./Header";

import { getRandomMeal } from "../api";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [randomMeal, setRandomMeal] = useState(null);

  const onGetRandomMeal = () => {
    getRandomMeal()
      .then((meal) => {
        setRandomMeal(meal);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app-container">
      <Header onSearch={(value) => setSearchTerm(value)} />
      {searchTerm && <p>Search results for {searchTerm}</p>}
      <button onClick={onGetRandomMeal}>Get random meal</button>
      {randomMeal && (
        <div className="meal">
          <h2 className="meal-name">{randomMeal.strMeal}</h2>
          <p className="meal-instructions">{randomMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}
