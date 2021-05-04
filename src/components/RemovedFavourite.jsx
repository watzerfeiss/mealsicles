import React from "react";

function RemovedFavourite({ name, onRefavourite }) {
  return (
    <div className="removed-favourite">
      {`${name} removed from favourites.`}
      <button type="button" onClick={onRefavourite}>
        Undo
      </button>
    </div>
  );
}

export default RemovedFavourite;
