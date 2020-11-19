import * as api from "./api";

export function setView(view) {
  return {
    type: "set-view",
    payload: view,
  };
}

// async actions

export function setDisplayedMeal(id) {
  return (dispatch) => {
    dispatch({
      type: "display-meal/start",
    });
    api
      .fetchMeal(id)
      .then((data) =>
        dispatch({
          type: "display-meal/success",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "display-meal/failure",
          payload: err,
        })
      );
  };
}

export function search(term) {
  return (dispatch) => {
    dispatch({
      type: "search/start",
      payload: term,
    });
    api
      .search(term)
      .then((data) =>
        dispatch({
          type: "search/success",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "search/failure",
          payload: err,
        })
      );
  };
}

export function setMealOfTheDay() {
  return (dispatch) => {
    api
      .getMealOfTheDay()
      .then((data) =>
        dispatch({
          type: "set-motd/success",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "set-motd/failure",
          payload: err,
        })
      );
  };
}
