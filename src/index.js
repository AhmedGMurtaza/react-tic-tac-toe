import React, { Component } from "react";
import { render } from "react-dom";
import Block from "./Block";
import PropTypes from "prop-types";
import "./style.css";

const X = "x";
const O = "o";

const DeclareWinner = ({ winner }) => (
  <h1 className="winner">
    Winner is <span>{winner.toUpperCase()}</span>
  </h1>
);
DeclareWinner.propTypes = {
  winner: PropTypes.string.isRequired
};

class Board extends Component {
  state = {
    blocks: Array(9).fill(undefined),
    winner: undefined,
    nextTurn: X
  };

  selectBlock = (ind, turn) => {
    // if the block is not already selected
    if (!this.state.blocks[ind - 1]) {
      const newBlocks = [...this.state.blocks];
      newBlocks[ind - 1] = turn;

      this.setState(
        {
          nextTurn: turn === X ? O : X,
          blocks: newBlocks
        },
        () => {
          // when blocks updated then run this callback
          this.findStatus(turn);
        }
      );
    }
  };

  findStatus = (turn) => {
    if (this.checkWin(turn) === turn) {
      this.setState({ winner: turn });
    }
  };

  checkWin = (turn) => {
    const { blocks } = this.state;

    if (
      (blocks[0] === blocks[1] &&
        blocks[1] === blocks[2] &&
        blocks[1] === turn) ||
      (blocks[0] === blocks[3] &&
        blocks[3] === blocks[6] &&
        blocks[3] === turn) ||
      (blocks[0] === blocks[4] &&
        blocks[4] === blocks[8] &&
        blocks[4] === turn) ||
      (blocks[1] === blocks[4] &&
        blocks[4] === blocks[7] &&
        blocks[4] === turn) ||
      (blocks[3] === blocks[4] &&
        blocks[3] === blocks[5] &&
        blocks[3] === turn) ||
      (blocks[6] === blocks[7] &&
        blocks[7] === blocks[8] &&
        blocks[7] === turn) ||
      (blocks[2] === blocks[5] &&
        blocks[2] === blocks[8] &&
        blocks[2] === turn) ||
      (blocks[2] === blocks[4] && blocks[4] === blocks[6] && blocks[6] === turn)
    ) {
      return turn;
    }
  };

  renderBlocks = () => {
    let blocks = [];
    for (let i = 1; i < 10; i++) {
      blocks.push(
        <Block
          value={this.state.blocks[i - 1]}
          click={() => this.selectBlock(i, this.state.nextTurn)}
          key={i}
        />
      );
    }
    return blocks;
  };

  reset = () => {
    this.setState((preState) => {
      return {
        ...preState,
        blocks: Array(9).fill(undefined),
        winner: undefined
      };
    });
  };

  render() {
    const { winner, blocks } = this.state;

    return (
      <div className="wrapper">
        <h1>React Tic Tac toe</h1>
        <div className="guessboard">
          {winner ? <DeclareWinner winner={winner} /> : this.renderBlocks()}
        </div>
        {(blocks.filter((block) => block).length === 9 || winner) && (
          <button onClick={() => this.reset()}>Replay</button>
        )}
      </div>
    );
  }
}

render(<Board />, document.getElementById("root"));
