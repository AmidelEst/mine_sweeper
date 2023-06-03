import React from "react";

// Represents an individual cell in the Mine Sweeper game
const Cell = ({ col, i, j, onLClick, onRClick }) => {
  // Retrieves the value to be displayed in the cell
  const getValue = (cellData) => {
    const { isMine, isRevealed, neighbors, isFlagged } = cellData;
    if (!isRevealed) return isFlagged ? "🚩" : "🔲";
    if (isMine) return "💣";
    if (neighbors) return neighbors;
  };

  return (
    <div
      onClick={(e) => onLClick(e, i, j)} // Handles left click event on the cell
      onContextMenu={(e) => onRClick(e, i, j)} // Handles right click event on the cell
      className="cell"
      data-dimention={`${i}-${j}`}
    >
      {getValue(col)} {/* Renders the value in the cell */}
    </div>
  );
};

export default Cell;
