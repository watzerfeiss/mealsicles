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
        displayedMeal: action.payload,
        currentView: "meal-details",
      };

    case "set-motd/success":
      return {
        ...state,
        mealOfTheDay: action.payload,
      };

    case "search/start":
      return {
        ...state,
        currentView: "search",
        search: {
          ...state.search,
          term: action.payload,
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
          results: action.payload,
          error: null,
          isLoading: false,
        },
      };

    case "search/failure":
      return {
        ...state,
        search: {
          ...state.search,
          error: action.payload,
          isLoading: false,
        },
      };

    case "load-categories/success":
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
}
