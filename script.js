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

  const placeToken = (row, column, playerToken) => {
    board[row][column].addToken(playerToken);
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

  const addToken = (playerToken) => {
    value = playerToken;
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

  // Initialise players and corresponding tokens
  const players = [
    { name: playerOneName, token: "X" },
    { name: playerTwoName, token: "O" },
  ];

  // Initialise player to go first
  let activePlayer = players[0];

  // Switch player using ternary condition operator
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // Return the current active player
  const getActivePlayer = () => activePlayer;

  // Print a new round
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  // Check for winning conditions
  const checkWinner = () => {
    const currentBoard = board.getBoard();
    for (let i = 0; i < 3; i++) {
      // Check rows
      if (
        currentBoard[i][0].getValue() === getActivePlayer().token &&
        currentBoard[i][1].getValue() === getActivePlayer().token &&
        currentBoard[i][2].getValue() === getActivePlayer().token
      ) {
        return true; // Horizontal win
      }
      // Check columns
      if (
        currentBoard[0][i].getValue() === getActivePlayer().token &&
        currentBoard[1][i].getValue() === getActivePlayer().token &&
        currentBoard[2][i].getValue() === getActivePlayer().token
      ) {
        return true; // Vertical win
      }
    }

    // Check diagonals
    if (
      currentBoard[0][0].getValue() === getActivePlayer().token &&
      currentBoard[1][1].getValue() === getActivePlayer().token &&
      currentBoard[2][2].getValue() === getActivePlayer().token
    ) {
      return true; // Diagonal top-left to bottom-right
    }
    if (
      currentBoard[0][2].getValue() === getActivePlayer().token &&
      currentBoard[1][1].getValue() === getActivePlayer().token &&
      currentBoard[2][0].getValue() === getActivePlayer().token
    ) {
      return true; // Diagonal top-right to bottom-left
    }

    return false; // No winning condition met
  };

  // Check for draw
  const checkDraw = () => {
    for (let row of board.getBoard()) {
      for (let cell of row) {
        if (cell.getValue() === "") {
          return false; // There is an empty cell, game is not a draw
        }
      }
    }
    return true; // All cells are filled, game is a draw
  };

  // Check if it's a valid move
  const validateMove = (row, column) => {
    return board.getBoard()[row][column].getValue() === "";
  };

  // Play round function to play in the console
  const playRound = (row, column) => {
    // Validate the move before progressing further
    if (!validateMove(row, column)) {
      console.log(`Invalid Move! Cell taken!`);
      return;
    }
    console.log(`Placing ${getActivePlayer().token}'s token into row ${row}, column ${column}...`);
    board.placeToken(row, column, getActivePlayer().token);

    if (checkDraw()) {
      console.log(`Game Over! It's a Draw!`);
      return;
    }
    if (checkWinner()) {
      console.log(`Game Over! ${getActivePlayer().name} Wins!`);
      return;
    }
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

/*
ScreenController object to control what the player/s see.
*/
function ScreenController() {
  const game = GameController();
  const stateText = document.querySelector("#state-text");
  const boardDiv = document.querySelector("#board");
  stateText.textContent = "Turn...";
  function UpdateScreen() {
    // Clear the board
    boardDiv.textContent = "";
    // Get most recent version of the board and active player
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display the active player's turn
    stateText.innerHTML = `<span id="player-name">${activePlayer.name}'s </span> Turn...`;
    const playerNameText = stateText.querySelector("#player-name");

    // Change the color of text depending on the active player
    if (activePlayer.token === "X") {
      playerNameText.classList.remove("player-two");
      playerNameText.classList.add("player-one");
    } else if (activePlayer.token === "O") {
      playerNameText.classList.remove("player-one");
      playerNameText.classList.add("player-two");
    }

    // Render board
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.id = "Cell-" + rowIndex + colIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  }

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedCell = e.target;
    // Retrieving the row and column indexes from cell id
    const [rowIndex, colIndex] = selectedCell.id.slice(-2).split("");
    console.log(rowIndex, colIndex);
    game.playRound(+rowIndex, +colIndex);
    UpdateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  UpdateScreen();
}

ScreenController();
