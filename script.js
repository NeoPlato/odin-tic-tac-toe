/* eslint-disable no-unused-vars */
const Player = (name, mark) => {
  const getMark = () => mark;
  const getName = () => name;
  return { getMark, getName };
};

const game = (() => {
  const gameArray = Array(9).fill(undefined);
  let players;
  let turn = 0;
  const draw = {
    isDraw: true,
  };

  const startGame = (P1, P2) => {
    players = [Player(P1, "X"), Player(P2, "O")];

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
    gameArray.fill(undefined);
    let players;
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      const rowSet = [Array(3), Array(3)];
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

    if (gameArray.every(Boolean)) {
      return draw;
    }
  };

  const endGame = (winner) => {
    if (winner.isDraw) {
      console.log(
        players
          .map(
            (player) => `${player.getName()} of the ${player.getMark()}-Team`
          )
          .join(" draws with ") + ". The ref wins!"
      );
    } else {
      console.log(
        `${winner.getName()} of the ${winner.getMark()}-Team wins this round!`
      );
    }
    clearScreen();
  };

  const makeMove = (index) => {
    const player = players[turn];
    gameArray[index] = player.getMark();
    printScreen();
    turn += 1;
    turn %= 2;
    return player.getMark();
  };

  return { startGame, makeMove, checkWinner, printScreen, endGame };
})();
