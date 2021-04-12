import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loadFavourites } from "../api";

export default function FavouritesView({ dispatch, favourites }) {
  useEffect(() => {
    if (!favourites) {
      dispatch(loadFavourites());
    }
  }, []);

  return favourites ? <div className="favourites-list"></div> : null;
}
