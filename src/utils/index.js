import { produce } from "immer";

// Generates random mine positions on the game grid
export const generateRandomMines = (data = [], height = 0, width = 0, mines = 0) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

// Retrieves neighboring cells of a given cell
export const getNeighbors = (i = 0, j = 0, data = [], height = 0, width = 0) => {
  let neighbors = [];
  const surroundings = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push(data[newX][newY]);
    }
  });
  return neighbors;
};

// Generates the number of neighboring mines for each cell
export const generateNeighbors = (data = [], height = 0, width = 0) => {
  let dataCopy = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      let mines = 0;
      const area = getNeighbors(data[i][j].x, data[i][j].y, data, height, width);
      area.map((value) => {
        if (value.isMine) {
          return mines++;
        }
        return 0;
      });
      if (!mines) {
        dataCopy[i][j].isEmpty = true;
      }
      dataCopy[i][j].neighbors = mines;
    }
  }
  return dataCopy;
};

// Initializes the game board with mines and neighbors
export const initBoard = (setupData) => {
  const { width: w, height: h, mines: m } = setupData;
  let array2D = Array(w)
    .fill()
    .map((_, indexH) =>
      Array(h)
        .fill()
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isMine: false,
          neighbors: 0,
          isEmpty: false,
          isRevealed: false,
          isFlagged: false,
        }))
    );
  let mutatedArrayWithMines = generateRandomMines(array2D, w, h, m);
  let mutatedArrayWithNeighbors = generateNeighbors(mutatedArrayWithMines, w, h);
  return mutatedArrayWithNeighbors;
};

// Reveals empty cells and their neighboring cells recursively
export const showEmptyCells = (h, w, x, y, data) => {
  let neighbors = getNeighbors(x, y, data, h, w);
  neighbors.map((cell) => {
    if (!cell.isRevealed && (cell.isEmpty || !cell.isMine) && !cell.isFlagged) {
      Object.assign(data[cell.x][cell.y], { isRevealed: true });
      if (cell.isEmpty) {
        showEmptyCells(h, w, cell.x, cell.y, data);
      }
    }
    return null;
  });
  return data;
};

// Reveals the entire game grid
export const showGrid = (data) => {
  const revealedGrid = produce(data, (draft) =>
    draft.map((row) =>
      row.map((cell) => {
        return { ...cell, isRevealed: true };
      })
    )
  );
  return revealedGrid;
};
