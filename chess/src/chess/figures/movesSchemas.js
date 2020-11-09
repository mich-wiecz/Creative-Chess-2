import { names } from './names';
const straightMoves = [{ row: 1 }, { row: -1 }, { col: -1 }, { col: 1 }];

const diagonalMoves =  [
  { row: 1, col: 1 },
  { row: -1, col: 1 },
  { row: -1, col: -1 },
  { row: 1, col: -1 },
];

const knightMoves = [
  { row: 2, col: 1 },
  { row: 1, col: 2 },
  { row: -1, col: 2 },
  { row: -2, col: 1 },
  { row: -2, col: -1 },
  { row: -1, col: -2 },
  { row: 1, col: -2 },
  { row: 2, col: -1 },
];



const allStandardMoves = straightMoves.concat(diagonalMoves);


const pawnWalkMoves = [{ row: 1 }],
  pawnCaptureMoves = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
  ],
  setPawnMoves = (amountOfWalkMoves) => {
    return [
        {type: 'walk', steps: pawnWalkMoves, amount: amountOfWalkMoves},
        {type: 'capture', steps: pawnCaptureMoves, amount: 1}
      ]
  };

export const classicFiguresMoves = {
  [names.queen]: [{ steps: allStandardMoves, amount: Infinity }],
  [names.king]: [{ steps: allStandardMoves, amount: 1 }],
  [names.rook]: [{
    steps: straightMoves,
    amount: Infinity,
  }],
  [names.bishop]: [{ steps: diagonalMoves, amount: Infinity }],
  [names.knight]: [{
    steps: knightMoves,
    amount: 1,
  }],
  [names.pawn]: ({position, startPosition}) => {
      if (position === startPosition) {
        return [setPawnMoves(2)]
      }
      return [setPawnMoves(1)]
  }
};


export const capablancaFiguresMoves = {
  [names.chancellor]: [
    { steps: knightMoves, amount: 1 },
    { steps: straightMoves, amount: Infinity },
  ],
  [names.archbishop]: [
    { steps: knightMoves, amount: 1 },
    { steps: diagonalMoves, amount: Infinity },
  ],
}
