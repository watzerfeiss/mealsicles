export default function withThunks(dispatch) {
  return function asyncDispatch(action) {
    if (typeof action === "function") {
      return action(asyncDispatch);
    }
    return dispatch(action);
  };
}
