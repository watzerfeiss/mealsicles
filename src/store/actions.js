import * as api from "../api";

function asyncAction(initAction, asyncFunction, ...args) {
  return (dispatch) => {
    dispatch({ ...initAction, type: `${initAction.type}/start` });
    asyncFunction(...args)
      .then((data) => {
        dispatch({
          type: `${initAction.type}/success`,
          payload: { ...(initAction.payload || {}), data }
        });
      })
      .catch((err) => {
        dispatch({
          type: `${initAction.type}/failure`,
          payload: { ...(initAction.payload || {}), err }
        });
      });
  };
}

export function setDisplayedMeal(id) {
  return asyncAction({ type: "display-meal" }, api.fetchMeal, id);
}

export function search(term) {
  return asyncAction({ type: "search", payload: { term } }, api.search, term);
}

export function setMealOfTheDay() {
  return asyncAction({ type: "set-motd" }, api.getMealOfTheDay);
}

export function loadSelectionOptions(optionsType) {
  return asyncAction(
    { type: "load-selection-options", payload: { optionsType } },
    api.fetchSelectionOptions,
    optionsType
  );
}

export function selectMeals(selectionType, selectionTerm) {
  return asyncAction(
    { type: "select-meals", payload: { selectionType, selectionTerm } },
    api.selectMeals,
    selectionType,
    selectionTerm
  );
}

export function loadFavourites() {
  return asyncAction({ type: "load-favourites" }, api.loadFavourites);
}

export function saveFavourite(meal) {
  return asyncAction({ type: "save-favourite" }, api.saveFavourite, meal);
}

export function deleteFavourites(ids) {
  return asyncAction({ type: "delete-favourites" }, api.deleteFavourites, ids);
}
