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

export function setRandomMeal() {
  return (dispatch) => {
    api
      .getRandomMeal()
      .then((data) =>
        dispatch({
          type: "set-random-meal/success",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "set-random-meal/failure",
          payload: err,
        })
      );
  };
}
