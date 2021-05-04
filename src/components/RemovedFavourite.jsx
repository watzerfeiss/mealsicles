import React from "react";
import PropTypes from "prop-types";

function RemovedFavourite({ name, onRefavourite }) {
  return (
    <div className="removed-favourite">
      {name} removed from favourites.
      <button type="button" onClick={onRefavourite}>
        Undo
      </button>
    </div>
  );
}

RemovedFavourite.propTypes = {
  name: PropTypes.string.isRequired,
  onRefavourite: PropTypes.func.isRequired
};

export default RemovedFavourite;
