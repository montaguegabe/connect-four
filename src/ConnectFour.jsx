import React, { useState, useCallback } from 'react';
import './ConnectFour.css';

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

export default function ConnectFour() {
  const [board, setBoard] = useState(Array(ROWS * COLS).fill(EMPTY));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = useCallback((newBoard) => {
    // Check horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col <= COLS - 4; col++) {
        const idx = row * COLS + col;
        if (newBoard[idx] &&
            newBoard[idx] === newBoard[idx + 1] &&
            newBoard[idx] === newBoard[idx + 2] &&
            newBoard[idx] === newBoard[idx + 3]) {
          return newBoard[idx];
        }
      }
    }

    // Check vertical
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row <= ROWS - 4; row++) {
        const idx = row * COLS + col;
        if (newBoard[idx] &&
            newBoard[idx] === newBoard[idx + COLS] &&
            newBoard[idx] === newBoard[idx + COLS * 2] &&
            newBoard[idx] === newBoard[idx + COLS * 3]) {
          return newBoard[idx];
        }
      }
    }

    // Check diagonal (bottom-left to top-right)
    for (let row = 0; row <= ROWS - 4; row++) {
      for (let col = 0; col <= COLS - 4; col++) {
        const idx = row * COLS + col;
        if (newBoard[idx] &&
            newBoard[idx] === newBoard[idx + COLS + 1] &&
            newBoard[idx] === newBoard[idx + (COLS + 1) * 2] &&
            newBoard[idx] === newBoard[idx + (COLS + 1) * 3]) {
          return newBoard[idx];
        }
      }
    }

    // Check diagonal (top-left to bottom-right)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col <= COLS - 4; col++) {
        const idx = row * COLS + col;
        if (newBoard[idx] &&
            newBoard[idx] === newBoard[idx - COLS + 1] &&
            newBoard[idx] === newBoard[idx - (COLS - 1) * 2] &&
            newBoard[idx] === newBoard[idx - (COLS - 1) * 3]) {
          return newBoard[idx];
        }
      }
    }

    return null;
  }, []);

  const dropPiece = (col) => {
    if (gameOver || winner) return;

    // Find the lowest empty row in the column
    let row = ROWS - 1;
    while (row >= 0 && board[row * COLS + col] !== EMPTY) {
      row--;
    }

    if (row < 0) return; // Column is full

    const newBoard = [...board];
    newBoard[row * COLS + col] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      return;
    }

    // Check if board is full
    if (newBoard.every(cell => cell !== EMPTY)) {
      setGameOver(true);
      return;
    }

    setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
  };

  const resetGame = () => {
    setBoard(Array(ROWS * COLS).fill(EMPTY));
    setCurrentPlayer(PLAYER1);
    setWinner(null);
    setGameOver(false);
  };

  const renderCell = (index) => {
    const piece = board[index];
    return (
      <div
        key={index}
        className={`cell ${piece === PLAYER1 ? 'red' : piece === PLAYER2 ? 'yellow' : ''}`}
      />
    );
  };

  return (
    <div className="connect-four-container">
      <h1>Connect Four</h1>

      <div className="game-info">
        {!gameOver && !winner && (
          <p className="turn-indicator">
            Current Player: <span className={`player-${currentPlayer}`}>
              {currentPlayer === PLAYER1 ? 'Red' : 'Yellow'}
            </span>
          </p>
        )}
        {winner && (
          <p className="winner-indicator">
            🎉 Player <span className={`player-${winner}`}>
              {winner === PLAYER1 ? 'Red' : 'Yellow'}
            </span> Wins! 🎉
          </p>
        )}
        {gameOver && !winner && (
          <p className="draw-indicator">It's a Draw!</p>
        )}
      </div>

      <div className="board-container">
        <div className="column-buttons">
          {Array.from({ length: COLS }).map((_, col) => (
            <button
              key={`btn-${col}`}
              className="column-button"
              onClick={() => dropPiece(col)}
              disabled={gameOver && winner}
            >
              ▼
            </button>
          ))}
        </div>

        <div className="board">
          {Array.from({ length: ROWS * COLS }).map((_, index) => renderCell(index))}
        </div>
      </div>

      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}
