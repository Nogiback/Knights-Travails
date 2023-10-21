class Game {
  constructor(size = 8) {
    this.size = size;
    this.board = this.generateBoard(size);
  }

  generateBoard(size) {
    let board = [];
    for (let i = 0; i < size; i++) {
      let boardRow = [];
      for (let j = 0; j < size; j++) {
        boardRow.push([i, j]);
      }
      board.push(boardRow);
    }
    return board;
  }
}

function checkLegalMove(position, boardSize) {
  if (
    position[0] >= 0 &&
    position[0] < boardSize &&
    position[1] >= 0 &&
    position[1] < boardSize
  ) {
    return true;
  } else {
    return false;
  }
}

function knightMoves(start, finish) {
  const newGame = new Game();
  const board = newGame.board;

  const possibleMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  const queue = [{ position: start, path: [start] }];
  const traversed = new Set();

  while (queue.length) {
    let { position, path } = queue.shift();

    if (position[0] === finish[0] && position[1] === finish[1]) {
      console.log(
        `=> You made it in ${path.length - 1} moves!  Here's your path:`,
      );
      path.forEach((position) => console.log(position));
      return path;
    }

    for (const move of possibleMoves) {
      let row = move[0];
      let col = move[1];
      let traversal = [position[0] + row, position[1] + col];

      if (
        !traversed.has(JSON.stringify(traversal)) &&
        checkLegalMove(traversal, newGame.size)
      ) {
        traversed.add(JSON.stringify(traversal));
        queue.push({ position: traversal, path: [...path, traversal] });
      }
    }
  }
  return null;
}

knightMoves([3, 3], [4, 3]); // 3 moves
knightMoves([0, 0], [7, 7]); // 6 moves
knightMoves([0, 0], [8, 8]); // invalid
