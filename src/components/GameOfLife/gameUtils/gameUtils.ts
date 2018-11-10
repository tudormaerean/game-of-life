import { cloneDeep } from 'lodash';

export interface GameTick {
  matrix: boolean[][];
  isValid: boolean;
}

export const gameTick = (matrix: boolean[][]): GameTick => {
  let nextGameTick: GameTick = {
    matrix: cloneDeep(matrix),
    isValid: false,
  };
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < matrix[rowIndex].length; columnIndex++) {
      let aliveNeighbours: number = 0;
      neighbourColumnLoop:
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (!(i === 0 && j === 0) &&
              matrix[rowIndex + i] !== undefined && matrix[rowIndex + i][columnIndex + j] === true) {
            aliveNeighbours++;
            if (aliveNeighbours > 3) break neighbourColumnLoop;
          }
        }
      }
      if ((matrix[rowIndex][columnIndex] && (aliveNeighbours < 2 || aliveNeighbours > 3)) ||
        !matrix[rowIndex][columnIndex] && aliveNeighbours === 3) {
        nextGameTick.matrix[rowIndex][columnIndex] = !matrix[rowIndex][columnIndex];
      }
    }
  }
  return nextGameTick;
};
