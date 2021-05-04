import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ShowMoreList({
  items,
  initialCount,
  increment,
  render
}) {
  const [shownCount, setShownCount] = useState(initialCount);
  const finalShownCount = Math.min(shownCount, items.length);
  const shownItems = items.slice(0, finalShownCount);

  const showMore = () => {
    setShownCount((count) => count + increment);
  };

  return (
    <>
      {render(shownItems)}
      <div className="show-more">
        <p className="show-more__count">
          Showing {finalShownCount} of {items.length} items
        </p>
        {items.length > shownCount && (
          <button
            className="btn page-link show-more__btn"
            type="button"
            onClick={showMore}
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
}

ShowMoreList.propTypes = {
  items: PropTypes.array.isRequired,
  initialCount: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  render: PropTypes.func
};
