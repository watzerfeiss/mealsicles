import PropTypes from "prop-types";

export const meal = PropTypes.shape({
  id: PropTypes.number.isRequired,
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
