import { useReducer, useRef, useCallback } from "react";

function withThunks(dispatch, getState) {
  return function asyncDispatch(action) {
    if (typeof action === "function") {
      return action(asyncDispatch, getState);
    }
    return dispatch(action);
  };
}

export default function useAsyncReducer(...args) {
  const stateRef = useRef(null);
  const [state, dispatch] = useReducer(...args);

  stateRef.current = state;
  const getState = useCallback(() => stateRef.current, [stateRef]);

  const asyncDispatch = withThunks(dispatch, getState);
  return [stateRef.current, asyncDispatch];
}
