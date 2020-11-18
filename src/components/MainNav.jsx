import React from "react";

export default function MainNav() {
  return (
    <nav className="app-nav">
      <ul>
        <li className="app-nav__item">
          <a href="">Favourites</a>
        </li>
        <li className="app-nav__item">
          <a href="" className="current-page">
            Categories
          </a>
        </li>
        <li className="app-nav__item">
          <a href="">Areas</a>
        </li>
        <li className="app-nav__item">
          <a href="">Ingredients</a>
        </li>
      </ul>
    </nav>
  );
}
