import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function AreaList({ areas }) {
  return (
    <ul className="areas-list">
      {areas.map((area) => (
        <li className="areas-list__item" key={area.name}>
          <Link to={`/area/${area.name}`} className="area-link">
            {area.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

AreaList.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};
