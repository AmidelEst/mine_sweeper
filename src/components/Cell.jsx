import React from "react";

const Cell = ({ col, i, j, onLClick, onRClick }) => {
  const getValue = (cellData) => {
    const { isMine, isRevealed, neighbors, isFlagged } = cellData;
    if (!isRevealed) return isFlagged ? "🚩" : "🔲";
    if (isMine) return "💣";
    if (neighbors) return neighbors;
  };

  return (
    <div
      onClick={(e) => onLClick(e, i, j)} //start to pass upward from this div to father board
      onContextMenu={(e) => onRClick(e, i, j)}
      className="cell"
      data-dimention={`${i}-${j}`}
    >
      {getValue(col)}
    </div>
  );
};

export default Cell;
