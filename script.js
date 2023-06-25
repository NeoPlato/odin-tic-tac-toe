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
    P1: undefined,
    P2: undefined,
  };

  const startGame = (P1, P2) => {
    players = [Player(P1, "X"), Player(P2, "O")];
    draw.P1 = P1;
    draw.P2 = P2;
  };

  const clearScreen = () => {
    gameArray.fill(undefined);
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

    turn += 1;
    turn %= 2;
  };

  const makeMove = (index) => {
    const player = players[turn];
    gameArray[index] = player.getMark();
    return player.getMark();
  };

  return {
    startGame,
    makeMove,
    checkWinner,
    clearScreen,
  };
})();
