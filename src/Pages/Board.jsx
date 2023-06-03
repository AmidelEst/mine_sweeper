import React, { useState } from "react";
import { Button } from "@mui/material";
import { initBoard, showEmptyCells, showGrid } from "../utils";
import Cell from "../components/Cell";
import { produce } from "immer";

const Board = ({ setupData, setGameStarted }) => {
  // 1. State variables
  const [gameState, setGameState] = useState("Game ON"); // Tracks the current game state
  const [mineCount, setMineCount] = useState(setupData.mines); // Tracks the number of remaining mines
  const [grid, setGrid] = useState(() => initBoard(setupData)); // Represents the game grid

  // 2. Handles left click on a cell
  const onLeftClick = (event, x, y) => {
    event.preventDefault();
    if (grid[x][y].isRevealed || grid[x][y].isFlagged) return;

    //3.  Updates the grid using the produce function from immer library
    const updatedGrid = produce(grid, (draft) => {
      Object.assign(draft[x][y], { isRevealed: true });
      if (draft[x][y].isEmpty) {
        showEmptyCells(setupData.height, setupData.width, x, y, draft);
      }
    });

    if (updatedGrid[x][y].isMine) {
      const revealedGrid = showGrid(updatedGrid);
      setGrid(revealedGrid);
      return setGameState("Game Over");
    }
    //Winning strategy
    const hiddenGrid = updatedGrid.flat().filter((cell) => !cell.isRevealed);
    if (hiddenGrid.length === setupData.mines) {
      setGameState("Yay you win 🎉");
      showEmptyCells();
    }
    setGrid(updatedGrid);
  };

  // Handles right click on a cell
  const onRightClick = (event, x, y) => {
    event.preventDefault();
    let mineCountPlaceholder = mineCount;
    if (grid[x][y].isRevealed) return;

    // Updates the grid and mine count based on flagging or unflagging a cell
    const updatedGrid = produce(grid, (draft) => {
      draft[x][y].isFlagged ? (mineCountPlaceholder += 1) : (mineCountPlaceholder -= 1);
      if (mineCountPlaceholder >= 0 && mineCountPlaceholder <= mineCount + 1) {
        draft[x][y].isFlagged = !draft[x][y].isFlagged;
        setMineCount(mineCountPlaceholder);
      }
    });

    setGrid(updatedGrid);
  };

  // Resets the game
  const resetGame = (e, setupData) => {
    e.preventDefault();
    setGameState("Game ON");
    setMineCount(setupData.mines);
    setGrid(initBoard(setupData));
  };

  return (
    //HTML PART
    <div className="center">
      <h1 style={{ marginBottom: "5px" }}>{gameState}</h1>
      <h3>Mines Remaining: {mineCount}</h3>
      <Button
        onClick={(e) => resetGame(e, setupData)}
        variant="outlined"
        style={{ marginBottom: "10px" }}
      >
        Reset the Game
      </Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${setupData.width}, 30px)`,
          gridTemplateRows: `repeat(${setupData.height}, 30px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((col, j) => (
            <Cell
              onLClick={(e, i, j) => onLeftClick(e, i, j)}
              onRClick={(e, i, j) => onRightClick(e, i, j)}
              key={`${i}-${j}`}
              col={col}
              i={i}
              j={j}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
