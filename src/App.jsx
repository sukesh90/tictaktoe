import { useState } from "react";

import PlayerInfo from "./components/PlayerInfo.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from './components/Log.jsx';
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYER_NAME = {
    X: 'Player 1',
    O: 'Player 2'
};

function derivedActivePlayer(gameTurn) {
  let currentPlayer = 'X';
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveBoard(gameTurn) {
  let gameBoardValues = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoardValues[row][col] = player;
  }
  return gameBoardValues;
}

function deriveWinner(gameBoardValues) {
  let winner;
  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoardValues[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoardValues[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoardValues[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }
  return winner;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYER_NAME)
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurn);
  const gameBoardValues = deriveBoard(gameTurn);
  const winner = deriveWinner(gameBoardValues);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn(prevTurns => {
      let currentActive = derivedActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentActive }, ...prevTurns];
      return updatedTurns;
    })
  }

  function handleRematch(){
    setGameTurn([]);
  }

  function handleNameChangePlayer(symbol, argument) {
    setPlayerName(prevPlay => {
      return {
        ...prevPlay,
        [symbol]: argument
      };
    });
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <PlayerInfo initalName="Player1" symbol="X" isActive={activePlayer == 'X'} onNameChange={handleNameChangePlayer}/>
        <PlayerInfo initalName="Player2" symbol="O" isActive={activePlayer == 'O'} onNameChange={handleNameChangePlayer}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner={playerName[winner]} onRestart={handleRematch}/>}
       <GameBoard onSelectePlayer={handleSelectSquare} board={gameBoardValues} />
    </div>
    <Log turns={gameTurn} />
  </main>
  )
}

export default App


