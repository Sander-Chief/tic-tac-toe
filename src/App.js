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
    this.setState({
      game: !this.state.game
    });
  }

  render() {
    return (
      <div className="wrapper">
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