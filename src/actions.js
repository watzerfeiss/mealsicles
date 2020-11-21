import * as api from "./api";

export function setView(view) {
  return {
    type: "set-view",
    payload: view,
  };
}

// async actions

function asyncAction(initAction, asyncFunction, ...args) {
  return (dispatch) => {
    dispatch({ ...initAction, type: `${initAction.type}/start` });
    asyncFunction(...args)
      .then((data) => {
        dispatch({ type: `${initAction.type}/success`, payload: data });
      })
      .catch((err) => {
        dispatch({ type: `${initAction.type}/failure`, payload: err });
      });
  };
}

export function setDisplayedMeal(id) {
  return asyncAction({ type: "display-meal" }, api.fetchMeal, id);
}

export function search(term) {
  return asyncAction({ type: "search", payload: term }, api.search, term);
}

export function setMealOfTheDay() {
  return asyncAction({ type: "set-motd" }, api.getMealOfTheDay);
}

export function loadCategories() {
  return asyncAction({ type: "load-categories" }, api.fetchCategories);
}
