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

const maxMovesAmount = 99;



const allStandardMoves = straightMoves.concat(diagonalMoves);


const pawnMoves = {
  forward: {
    walks: [{ row: 1 }],
    captures: [
      { row: 1, col: 1 },
      { row: 1, col: -1 },
    ]
  },
  downward: {
    walks: [{row: -1}],
    captures: [
      {row: -1, col: 1},
      {row: -1, col: -1}
    ]
  }
}

const setPawnMoves = (amountOfWalkMoves, direction) => {
  return [
    {type: 'walk', steps: pawnMoves[direction].walks, amount: amountOfWalkMoves},
    {type: 'capture', steps: pawnMoves[direction].captures, amount: 1}
  ]  
  }

export const classicFiguresMoves = {
  [names.queen]: [{ steps: allStandardMoves, amount: maxMovesAmount }],
  [names.king]: [{ steps: allStandardMoves, amount: 1 }],
  [names.rook]: [{
    steps: straightMoves,
    amount: maxMovesAmount,
  }],
  [names.bishop]: [{ steps: diagonalMoves, amount: maxMovesAmount }],
  [names.knight]: [{
    steps: knightMoves,
    amount: 1,
  }],
  [names.pawn]: ({position, startPosition, direction}) => {
      if (position === startPosition) {
        return setPawnMoves(2, direction)
      }
      return setPawnMoves(1, direction)
  }
};


export const capablancaFiguresMoves = {
  [names.chancellor]: [
    { steps: knightMoves, amount: 1 },
    { steps: straightMoves, amount: maxMovesAmount },
  ],
  [names.archbishop]: [
    { steps: knightMoves, amount: 1 },
    { steps: diagonalMoves, amount: maxMovesAmount },
  ],
}
