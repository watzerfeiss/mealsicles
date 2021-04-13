import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loadFavourites } from "../api";
import FavouriteCard from "./FavouriteCard";

export default function FavouritesView({ dispatch, favourites }) {
  useEffect(() => {
    if (!favourites) {
      dispatch(loadFavourites());
    }
  }, []);

  return favourites ? (
    <div className="favourites">
      <h2>{favourites.length} favourite meals</h2>
      <ul className="favourites-list">
        {favourites.map((fave) => (
          <li key={fave.id}>
            <FavouriteCard {...{ dispatch, favourite: fave }} />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
