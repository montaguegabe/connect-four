# Connect Four Game

A fully playable Connect Four game built with React and Vite.

## Features

✅ **Complete Game Logic**
- 7x6 game board (standard Connect Four dimensions)
- Turn-based gameplay for two players (Red vs Yellow)
- Intelligent piece placement (gravity - pieces fall to the lowest available position)
- Real-time win detection for:
  - Horizontal wins (4 in a row)
  - Vertical wins (4 in a row)
  - Diagonal wins (both directions, 4 in a row)
- Draw detection (board full, no winner)

✅ **User Interface**
- Clean, modern gradient background
- Interactive column drop buttons with visual feedback
- Glowing piece indicators (red and yellow with shadow effects)
- Current player turn indicator
- Winner announcement with celebration animation
- Game reset button to start a new game

✅ **Functional React Architecture**
- Single ConnectFour component with state management via `useState` and `useCallback`
- Efficient board representation using a flat array
- No external dependencies beyond React and ReactDOM
- Pure functional components

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The app will open at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

## How to Play

1. Players take turns by clicking the down arrow button above a column
2. Your piece (Red or Yellow) will fall to the lowest available position
3. First player to get 4 pieces in a row (horizontal, vertical, or diagonal) wins
4. Click "New Game" to reset and play again

## Project Structure

```
connect-four/
├── src/
│   ├── ConnectFour.jsx      # Main game component with logic
│   ├── ConnectFour.css      # Game styling
│   ├── App.jsx              # Root app component
│   ├── App.css              # App styling
│   └── main.jsx             # React entry point
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Technical Highlights

- **State Management**: Uses React hooks (`useState`, `useCallback`) for clean state handling
- **Win Detection Algorithm**: Checks all four directions (horizontal, vertical, both diagonals) for winning patterns
- **Responsive Design**: CSS media queries for mobile compatibility
- **Performance**: Efficient board representation and win checking algorithms
- **Visual Feedback**: Hover effects, animations, and color-coded player pieces

## Game Rules

- Red player always goes first
- Players alternate turns
- A piece cannot be placed in a full column
- Game ends when:
  - A player gets 4 pieces in a row (they win)
  - All 42 positions are filled (draw)
