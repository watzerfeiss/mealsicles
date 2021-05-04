import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import { loadFavourites } from "../store/actions";
import { deleteFavourites } from "../store/actions";
import { favourite } from "../shapes";

import FavouriteCard from "./FavouriteCard";

export default function FavouritesView({ dispatch, favourites }) {
  useEffect(() => {
    if (!favourites) {
      dispatch(loadFavourites());
    }
  }, []);

  const [removedFavourites, setRemovedFavourites] = useState({});

  // i simply need to submit the deleted favourites on unmount
  const removedRef = useRef(removedFavourites);
  useEffect(() => {
    removedRef.current = removedFavourites;
  }, [removedFavourites]);
  useEffect(
    () => () => {
      dispatch(deleteFavourites(Object.keys(removedRef.current)));
    },
    []
  ); // :facepalm:

  const onUnfavourite = (id) => {
    setRemovedFavourites({ ...removedFavourites, [id]: true });
  };

  const onRefavourite = (id) => {
    const { [id]: discard, ...newRemovedFavourites } = removedFavourites;
    setRemovedFavourites(newRemovedFavourites);
  };

  return favourites ? (
    <div className="favourites">
      <h2 className="favourites__heading">
        {favourites.length} favourite meals
      </h2>
      <ul className="meal-list">
        {favourites.map((fave) => (
          <li key={fave.id}>
            {fave.id in removedFavourites ? (
              <button onClick={() => onRefavourite(fave.id)}>Undo</button>
            ) : (
              <FavouriteCard
                {...{
                  dispatch,
                  favourite: fave,
                  onUnfavourite: () => onUnfavourite(fave.id)
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

FavouritesView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(favourite)
};
