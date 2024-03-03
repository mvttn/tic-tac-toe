/* 
The game board will represent the state of the board.
getBoard() will return the current state of the board
placeToken() checks if cell is empty, then add the player's token
printBoard() prints the board
*/
function GameBoard() {
  // Initialise the game board as a 3x3 2d array
  const rows = 3;
  const cols = 3;
  const board = [];

  // Initialise each array element as a Cell() object
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const placeToken = (row, column, player) => {
    if (board[row][column].getValue() !== "") return;

    board[row][column].addToken(player);
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, placeToken, printBoard };
}

/* 
Cell object to control the state of each cell
"value" will initially be empty, "X" or "O" corresponding to player's token
addToken() will change the value of the cell
getValue() will return the cell's value
*/
function Cell() {
  let value = "";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

/*
GameController object to keep track of the game. 
Handles switching players, playing rounds and determining
when the game ends.
*/
function GameController(playerOneName = "Player 1", playerTwoName = "Player 2") {
  const board = GameBoard();

  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (column) => {
    console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}...`);

    // Check for winner

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

let x = GameBoard();
x.printBoard();
