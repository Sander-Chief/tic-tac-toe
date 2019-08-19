import React from 'react';
import GameField from './GameField';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      game: false
    }
  }

  startGame = () => {
    let n = this.state.rows;
    let newBoard = [];
    for (let i = 0; i < n; i++) {
      let newRow = new Array(n).fill(-1);
      newBoard.push(newRow);
    };
    this.setState({
      game: !this.state.game
    });
  }

  render() {
    return (
      <div id="wrapper">
        <h1>
          {this.props.title}
        </h1>
        { this.state.game ?
          <GameField
            rows={this.state.rows}
            game={this.state.game}
          /> :
          <button
            onClick={this.startGame}
          >
            Start!
          </button>
        }
      </div>
    );
  }
}

export default App;