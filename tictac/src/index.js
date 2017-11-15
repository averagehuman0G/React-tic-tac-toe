import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//React functional component: since it only consists of a render method
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>{props.value}</button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  reset() {
    this.setState({squares: Array(9).fill(null)});
  }

  handleClick(i) {
    //makes a copy of the array instead of modifying the original array
    const squares = this.state.squares.slice();
    //doesn't continue if there is a winner or if the box is filled in already
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner !== 'tie' && winner) {
      status = 'Winner: ' + winner + '!';
    } else if (winner === 'tie' ){
      status = "It was a tie!";
    } else {
      status = "It's " + (this.state.xIsNext ? 'X' : 'O') + "'s turn";
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="rows">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <button className="reset" onClick={this.reset.bind(this)}>Reset</button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  let winner;
  let boardFull = (squares) => {
    return 9 === squares.filter((square) => {
      return square === 'X' || square === 'O';
    }).length;
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {

    const [a, b, c] = lines[i];
    //if it has a value and they all match then there is a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
      return winner;
    }
  }
  if (boardFull(squares) && winner !== 'X' && winner !== 'O') {
    return 'tie';
  }
  //there is no winner
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
