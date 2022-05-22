const X_CLASS = "x"; //for x
const CIRCLE_CLASS = "circle"; //for circle
const win_textmsg = document.querySelector("[data-winning-message-text]");
const win_msg = document.getElementById("winningMessage");
const WIN_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const blockElements = document.querySelectorAll("[data-cell]"); //grabbing block as node list
let board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
let circleTurn; //if its true then circle turn or x turn

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  blockElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  win_msg.classList.remove("show");
}

function handleClick(e) {
  //this function is getting attached to each and every cell/block
  const cell = e.target; //whatever cell/block we clicked on will be stored in const "cell"
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // placemark
  placeMark(cell, currentClass); //we are passing particular cell/block and current X or O
  // check for win
  if (checkWin(currentClass)) {
    // win_msg.classList.remove("show");
    endGame(false);
    console.log("YEP WON ");
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  // check for draw
  //   switch turns
}

function endGame(draw) {
  if (draw) {
    win_textmsg.innerText = `Draw!`;
  } else {
    win_textmsg.innerText = `${circleTurn ? "Os " : "Xs"} Wins!`;
  }
  win_textmsg.classList.add("show");
}

function isDraw() {
  return [...blockElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WIN_COMBO.some((combination) => {
    return combination.every((index) => {
      return blockElements[index].classList.contains(currentClass);
    });
  });
}
