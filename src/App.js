import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      positions: [],
      xIsNext: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.calculateWinner = this.calculateWinner.bind(this);
  }

  handleClick(i, y, x) {
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const positions = this.state.positions.slice();
    positions.push( '{' + y + ', ' + x + '}');
    

    let winnerData = this.calculateWinner(squares)
    if (winnerData.status || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        positions: positions,
        reversed: false,
    });
  }

  calculateWinner(squares)  {
    let winnerData = {
      status: null,
      winner: false,
      lines: null,
    };
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

    for ( let i = 0; i < lines.length; i++ ) {
        const[a, b, c ] = lines[i];
        if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ){
            winnerData.status = true;
            winnerData.winner = this.state.xIsNext ? '0' : 'X';
            winnerData.lines = lines[i];
            return winnerData;
        }
    }
    return winnerData;
  }

  jumpTo(e, step) {
    this.highlightSelectedButton(e);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  highlightSelectedButton(e) {
    const buttons = document.querySelectorAll('.button');
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('button-clicked');
    }
    e.target.classList.add('button-clicked');
  }

  changeOrder() {
    let reversed = !this.state.reversed;
    this.setState({
      reversed: reversed,
    });
  }

  render() {
    let history = this.state.history;
    let positions = this.state.positions;
    const current = history[this.state.stepNumber];
    const winnerData = this.calculateWinner(current.squares);

    if ( this.state.reversed ) {
      history = history.slice().reverse();
      positions = positions.slice().reverse();
    }


    const moves = history.map((step, move) => {
      let desc;
      
      /**
       * Keys are not reversed by reverse() - only values,
       * so move key has to be sorted here
       */
      if ( this.state.reversed && move > 0 ) {
        move = history.length - move;
      }
      
      if ( move ) {
        desc = 'Go to move # ' + move + ' - Position : ' + positions[move - 1];
      } else {
        desc = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={(e) => this.jumpTo(e, move)} className="button">{desc}</button>
        </li>
      );
    });

    let status;
    if (winnerData.status) {
        status = 'Winner: ' + winnerData.winner;
    } else {
        status = 'Next player : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
          onClick={(i, y, x) => this.handleClick(i, y, x)}
          winnerData={winnerData}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol key="move-list">
              {moves}
          </ol>
        </div>
        <div>
          <button className="game-change-order-button" onClick={() => this.changeOrder()}>Change order</button>
        </div>
      </div>
    );
  }
}

export default App;
