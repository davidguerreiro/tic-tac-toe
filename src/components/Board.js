import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
    constructor() {
        super();
        this.renderRow = this.renderRow.bind(this);
    }
    renderSquare(i, y, x) { 
        return <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i, y, x)}
            key={i}
        />
    }

    renderRow(start, y, limit) {
        let squares = [];
        for( let i = start, x = 0; i <= limit; i++, x++ ) {
            squares.push(this.renderSquare(i, y, x));
        }
        return (
          <div className="board-row">{squares}</div>
        );
    }

    render() {
        return (
            <div>            
                {this.renderRow(0, 0, 2)}
                {this.renderRow(3, 1, 5)}
                {this.renderRow(6, 2, 8)}
            </div>
        );
    }
}

export default Board;