/* eslint-disable no-unused-vars */
const Player = (name, mark) => {
  const getMark = () => mark;
  const getName = () => name;
  return { getMark, getName };
};

const game = (() => {
  let gameArray = Array(9);
  let players;
  let turn = 0;

  const startGame = () => {
    players = [
      Player(prompt("Player 1: "), "X"),
      Player(prompt("Player 2: "), "O"),
    ];

    console.log("We got: ");
    for (const player of players) {
      console.log(
        `${player.getName()} playing for the ${player.getMark()}-Team!`
      );
    }
    console.log("BEGIN!");
    printScreen();
  };

  const printScreen = () => {
    let gameState = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const mark = gameArray[j + i * 3];
        gameState += mark !== undefined ? mark : "◾";
      }
      gameState += "\n";
    }
    console.log(gameState);
  };

  const clearScreen = () => {
    gameArray = Array(9);
    players = undefined;
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      const rowSet = [Array(3), Array(3)];
      const verticalRow = Array(3);
      const horizontalRow = Array(3);
      for (let j = 0; j < 3; j++) {
        rowSet[0][j] = gameArray[i + 3 * j];
        rowSet[1][j] = gameArray[j + 3 * i];
      }
      for (const row of rowSet) {
        const start = row[0];
        if (start && row.every((value) => value === start)) {
          return players[turn];
        }
      }
    }

    const diagonals = [
      [0, 4, 8],
      [2, 4, 6],
    ].map((row) => row.map((index) => gameArray[index]));

    for (const row of diagonals) {
      const start = row[0];
      if (start && row.every((value) => value === start)) {
        return players[turn];
      }
    }
  };

  const endGame = (winner) => {
    console.log(
      `${winner.getName()} of the ${winner.getMark()}-Team wins this round!`
    );
    clearScreen();
  };

  const makeMove = (index) => {
    const player = players[turn];
    gameArray[index - 1] = player.getMark();
    printScreen();
    const winner = checkWinner();
    if (winner) {
      endGame(winner);
    }
    turn += 1;
    turn %= 2;
  };

  return { startGame, makeMove, printScreen };
})();
