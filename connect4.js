/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie).
 */

class Game {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    //TODO: do we need this?
    this.currPlayer = 1;

    //TODO: does this work as we intended?
    this.board = this.makeBoard();
  }

  /** switchCurrPlayer:
   *   checks the value of currPlayer and swaps the value to the other
   *   player instance
   */
  switchCurrPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }


  /** makeBoard: fill in global `board`:
   *    board = array of rows, each row is array of cells  (board[y][x])
  */

  makeBoard() {
    const board = [];

    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array(this.width).fill(null);
      board[y] = emptyRow;
    }

    return board;
  }


  /** findSpotInCol: given column x, return y coordinate of furthest-down spot
   *    (return null if filled)
   */

  findSpotInCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }

    return null;
  }


  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "checklist" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
          return true;
        }
      }
    }

    return false;
  }

  //TODO: Can this helper function be OUTSIDE of checkForWin?
  _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height && //TODO: do we lose reference of this here?
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }

}


export {
  Game
};