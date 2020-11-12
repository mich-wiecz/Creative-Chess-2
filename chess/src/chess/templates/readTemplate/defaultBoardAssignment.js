import { additionallyAddCoordToMovesMapping } from './additionallyAddCoordToMovesMapping';

export function defaultBoardAssignment(possibleMovesMapping, boardMap, coord, value) {
    additionallyAddCoordToMovesMapping(possibleMovesMapping, coord);

    boardMap[coord] = value;

}
