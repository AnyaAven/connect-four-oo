import {
  Game
} from "./connect4.js";


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard(connectFourGame) {
  console.log("makeHtmlBoard", {"this": this, connectFourGame});

  const $htmlBoard = document.querySelector("#board");

  // create top row of game to hold clickable cells
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // fill top row with clickable cells
  for (let x = 0; x < connectFourGame.width; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.addEventListener("click", handleClick.bind(connectFourGame)); //TODO: use bind here?
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < connectFourGame.height; y++) {
    const $row = document.createElement('tr');

    for (let x = 0; x < connectFourGame.width; x++) {
      const $cell = document.createElement('td');
      $cell.setAttribute('id', `c-${y}-${x}`);
      $row.append($cell);
    }

    $htmlBoard.append($row);
  }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  console.log("placeInTable", {"this": this});

  const $piece = document.createElement('div');
  $piece.classList.add('piece');
  $piece.classList.add(`p${this.currPlayer}`);

  const $spot = document.querySelector(`#c-${y}-${x}`);
  $spot.append($piece);
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  console.log("handleClick", {"this": this});

  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = this.findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  this.board[y][x] = this.currPlayer;
  placeInTable.bind(this)(y, x);

  // check for win
  if (this.checkForWin()) {
    return endGame(`Player ${this.currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  if (this.board[0].every(cell => cell !== null)) {
    return endGame('Tie!');
  }

  this.switchCurrPlayer();
}


/** Start game. */

function start() {
  console.log("start")

  const connectFourGame = new Game(6, 7);
  makeHtmlBoard(connectFourGame);
}

export { start };
