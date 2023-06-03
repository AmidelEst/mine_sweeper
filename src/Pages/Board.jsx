import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import { initBoard } from "../utils";
import Cell from "../components/Cell";
import { produce } from "immer";

const Board = () => {
  const setupData = {
    width: 10,
    height: 10,
    mines: 10,
  };

  const [gameState, setGameStates] = useState("Game ON");
  const [grid, setGrid] = useState(() => initBoard(setupData));
  const onLeftClick = (event, x, y) => {
    event.preventDefault();
    if (grid[x][y].isRevealed) return;
    const updatedGrid = produce(grid, (draft) => {
      Object.assign(draft[x][y], { isRevealed: true });
    });
    if (updatedGrid[x][y].isMine) return setGameStates("Game Over");

    setGrid(updatedGrid);
  };
  const restGame = (e, setupData) => {
    e.preventDefault();
    setGameStates("Game ON");
    setGrid(initBoard(setupData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="center">
        <h1 style={{ marginBottom: "5px" }}>{gameState}</h1>

        <Button
          onClick={(e) => restGame(e, setupData)}
          variant="outlined"
          style={{ marginBottom: "10px" }}
        >
          Reset the Game
        </Button>
        <br />
        <br />
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
                onLClick={(e, i, j) => onLeftClick(e, i, j)} //cell passes to board e,i,j to board father function
                key={`${i}-${j}`}
                col={col}
                i={i}
                j={j}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Board;
