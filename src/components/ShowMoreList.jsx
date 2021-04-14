import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ShowMoreList({
  items,
  initialCount,
  increment,
  render
}) {
  const [shownItemCount, setShownItemCount] = useState(initialCount);
  const shownItems = items.slice(0, shownItemCount);

  const showMore = () => {
    setShownItemCount((count) => Math.min(count + increment, items.length));
  };

  return (
    <>
      {render(shownItems)}
      {items.length < shownItemCount && (
        <button type="button" onClick={showMore}>
          Show more
        </button>
      )}
    </>
  );
}

ShowMoreList.propTypes = {
  items: PropTypes.array.isRequired,
  initialCount: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  render: PropTypes.func
};
