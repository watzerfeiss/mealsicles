export default function rootReducer(state, action) {
  switch (action.type) {
    case "set-view":
      return {
        ...state,
        currentView: action.payload,
      };

    case "display-meal/start":
      return {
        ...state,
        currentView: "meal-details",
        displayedMeal: null,
      };

    case "display-meal/success":
      return {
        ...state,
        displayedMeal: action.payload.data,
        currentView: "meal-details",
      };

    case "set-motd/success":
      return {
        ...state,
        mealOfTheDay: action.payload.data,
      };

    case "search/start":
      return {
        ...state,
        currentView: "search",
        search: {
          ...state.search,
          term: action.payload.term,
          results: null,
          error: null,
          isLoading: true,
        },
      };

    case "search/success":
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload.data,
          error: null,
          isLoading: false,
        },
      };

    case "search/failure":
      return {
        ...state,
        search: {
          ...state.search,
          error: action.payload.err,
          isLoading: false,
        },
      };

    case "load-selection-options/success":
      return {
        ...state,
        selectionTypes: {
          ...state.selectionTypes,
          [action.payload.optionsType]: action.payload.data,
        },
      };

    case "select-meals/start":
      return {
        ...state,
        currentView: "selection",
        selection: {
          type: action.payload.selectionType,
          term: action.payload.selectionTerm,
          results: null,
        },
      };

    case "select-meals/success":
      return {
        ...state,
        selection: {
          ...state.selection,
          results: action.payload.data,
        },
      };

    case "load-favourites/success":
    case "save-favourite/success":
    case "delete-favourites/success":
      return {
        ...state,
        favourites: action.payload.data,
      };

    default:
      return state;
  }
}
