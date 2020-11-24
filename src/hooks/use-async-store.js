import { useReducer, useRef, useCallback, useMemo } from "react";

function withThunks(dispatch, getState) {
  return function asyncDispatch(action) {
    if (typeof action === "function") {
      return action(asyncDispatch, getState);
    }
    return dispatch(action);
  };
}

export default function useAsyncStore(...args) {
  const stateRef = useRef(null);
  const [state, dispatch] = useReducer(...args);

  stateRef.current = state;
  const getState = useCallback(() => stateRef.current, [stateRef]);

  const asyncDispatch = useMemo(() => withThunks(dispatch, getState), []);
  return [stateRef.current, asyncDispatch];
}
