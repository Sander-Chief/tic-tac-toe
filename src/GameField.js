import React from 'react';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      player: 1,
      finished: false
    }
  }

  componentDidMount() {
    this.createNewField();
  }

  componentDidUpdate() {
    if (this.state.finished) {
      let winner;
      if (this.state.player === 1) {
        winner = 2;
      } else if (this.state.player === 2) {
        winner = 1;
      }
      alert("Player №" + winner + " won!");
    }
  }

  // create a new two-dimensional array to store board state
  createNewField = () => {
    let n = this.props.rows;
    let newBoard = [];
    for (let i = 0; i < n+4; i++) {
      let newRow = new Array(n+4).fill(-1);
      newBoard.push(newRow);
    };
    this.setState({
      board: newBoard
    });
  }

  showValue = (item) => {
    switch (item) {
      case 1:
        return "X";
        break;
      case 2:
        return "0";
        break;
      case -1:
        return "";
    }
  }

  handleClick = (e) => {
    if (!this.state.finished) {
      let row = parseInt(e.currentTarget.dataset.row);
      let space = parseInt(e.currentTarget.dataset.space);
      // do nothing if clicked space was already used
      if (this.state.board[row][space] != -1) {
        return;
      }
      let newBoard = this.state.board;
      newBoard[row][space] = this.state.player;
      this.setState({
        board: newBoard
      });
      this.checkWinner(row, space);
      // switch between players
      if (this.state.player === 1) {
        this.setState({
          player: 2
        });
      } else if (this.state.player === 2) {
        this.setState({
          player: 1
        });
      };
    };
  }

  restart = () => {
    this.createNewField();
    this.setState({
      player: 1,
      finished: false
    })
  }

  // checking if any of possible winning conditions is true, relative to last space clicked
  checkWinner = (row, space) => {
    let board = this.state.board;
    let curr = board[row][space];
    if (board[row][space+1] === curr && board[row][space-1] === curr ||
    board[row][space+1] === curr && board[row][space+2] === curr ||
    board[row][space-1] === curr && board[row][space-2] === curr ||
    board[row+1][space] === curr && board[row-1][space] === curr ||
    board[row+1][space] === curr && board[row+2][space] === curr ||
    board[row-1][space] === curr && board[row-2][space] === curr ||
    board[row-1][space-1] === curr && board[row+1][space+1] === curr ||
    board[row-1][space+1] === curr && board[row+1][space-1] === curr ||
    board[row-1][space+1] === curr && board[row-2][space+2] === curr ||
    board[row-1][space-1] === curr && board[row-2][space-2] === curr ||
    board[row+1][space+1] === curr && board[row-1][space-1] === curr ||
    board[row-1][space-1] === curr && board[row-2][space-2] === curr ||
    board[row+1][space+1] === curr && board[row+2][space+2] === curr ||
    board[row+1][space-1] === curr && board[row+2][space-2] === curr) {
      this.setState({
        finished: true
      })
      console.log("player #" + this.state.player + " won!");
    };
    return;
  }

  render() {
    const boardRows = this.props.game && this.state.board.map((row, i, arr1) => {
      const boardSpaces = row.map((column, j, arr2) => {
        // we don't render our first and last two rows/spaces, they are only used for corner cases in checkWinner function
        if (j > 1 && j < (arr2.length -2)) {
          return (
            <div
              className="space"
              data-row={i}
              data-space={j}
              key={i + "." + j}
              onClick={this.handleClick}
            >
              {this.showValue(this.state.board[i][j])}
            </div>
          )
        }
      });
      if (i > 1 && i < (arr1.length -2)) {
        return (
          <div
            className="row"
            key={"row" + i}
          >
            {boardSpaces}
          </div>
        )
      }
    });
    return (
      <div
        id="board"
      >
        {boardRows}
        { this.state.finished &&
          <button
            onClick={this.restart}
          >
            Restart
          </button>
        }
      </div>
    )
  }
}

export default GameField;