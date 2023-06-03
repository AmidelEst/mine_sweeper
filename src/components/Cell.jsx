import React from "react";

const Cell = ({ col, i, j, onLClick }) => {
  const getValue = (cellData) => {
    const { isMine, isRevealed, neighbors } = cellData;
    // if (!isRevealed) return null;
    if (isMine) return "💣";
    if (isRevealed) return "✅";
    if (neighbors) return neighbors;
  };

  return (
    <div
      onClick={(e) => onLClick(e, i, j)} //start to pass upward from this div to father board
      className="cell"
      data-dimention={`${i}-${j}`}
    >
      {getValue(col)}
    </div>
  );
};

export default Cell;
