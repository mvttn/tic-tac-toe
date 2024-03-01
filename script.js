// The game board will represent the state of the board.
function gameBoard() {
  // Initialise the game board as a 3x3 2d array
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(" ");
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, printBoard };
}

let x = gameBoard();
x.getBoard();
x.printBoard();
