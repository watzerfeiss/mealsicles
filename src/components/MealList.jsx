import React from "react";

export default function MealList({ dispatch, view, searchState }) {
  if (view === "search" && searchState) {
    return (
      <>
        <p>Search results for {searchState.term}</p>
        <ul>
          {searchState.results?.map((meal) => (
            <li key={meal.id}>{meal.name}</li>
          ))}
        </ul>
      </>
    );
  }
  return null;
}
