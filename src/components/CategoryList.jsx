import React, { useState } from "react";
import PropTypes from "prop-types";

import * as shapes from "../shapes";

import CategoryCard from "./CategoryCard";
import Modal from "./Modal";

export default function CategoryList({ categories }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  return (
    <>
      <ul className="categories-list">
        {categories.map((category) => (
          <li className={"categories-list__item"} key={category.id}>
            <a
              className="categories-list__card-link"
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                setExpandedCategory(category);
              }}
            >
              <CategoryCard category={category} />
            </a>
          </li>
        ))}
      </ul>
      {expandedCategory && (
        <Modal onClose={() => setExpandedCategory(null)}>
          <CategoryCard category={expandedCategory} isExpanded />
        </Modal>
      )}
    </>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(shapes.category)
};
