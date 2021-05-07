import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import * as shapes from "../shapes";
import { selectMeals } from "../store/actions";

import MealList from "./MealList";
import SearchableList from "./SearchableList";
import ShowMoreList from "./ShowMoreList";

const headings = {
  category: (count, name) =>
    `${count} meal${count !== 1 ? "s" : ""} in the ${name} category`,
  area: (count, name) => `${count} ${name} meal${count !== 1 ? "s" : ""}`,
  ingredient: (count, name) =>
    `${count} meal${count !== 1 ? "s" : ""} made with ${name}`
};

export default function MealSelectionView({ dispatch, selection, motdId }) {
  const { selectionType: type, selectionTerm: term } = useParams();
  useLayoutEffect(() => {
    if (!selection || selection.type !== type || selection.term !== term) {
      dispatch(selectMeals(type, term));
    }
  }, [type, term, selection]);

  const meals = selection?.results;

  return (
    <div className="meal-selection">
      <>
        {meals && (
          <h2 className="meal-selection__heading">
            {meals.length > 0
              ? headings[selection.type](
                  selection.results.length,
                  selection.term
                )
              : headings[selection.type]("Found no", selection.term)}
          </h2>
        )}

        {meals?.length > 0 && (
          <SearchableList
            searchableItems={meals.map((meal) => ({
              item: meal,
              searchKey: meal.name
            }))}
            render={(items) => (
              <ShowMoreList
                items={items}
                initialCount={10}
                increment={10}
                render={(items) => (
                  <MealList dispatch={dispatch} meals={items} motdId={motdId} />
                )}
              />
            )}
          />
        )}
      </>
    </div>
  );
}

MealSelectionView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selection: PropTypes.shape({
    type: PropTypes.oneOf(["category", "area", "ingredient"]).isRequired,
    term: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(shapes.meal)
  }),
  motdId: PropTypes.string
};
