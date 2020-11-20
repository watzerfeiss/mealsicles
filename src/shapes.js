import PropTypes from "prop-types";

export const meal = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  instructions: PropTypes.string,
  image: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  video: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredient: PropTypes.string.isRequired,
      measure: PropTypes.string.isRequired,
    })
  ),
});

export const mealList = PropTypes.arrayOf(meal);

export const searchState = PropTypes.shape({
  term: PropTypes.string,
  error: PropTypes.any,
  isLoading: PropTypes.bool,
  results: mealList,
});
