export function additionallyAddCoordToMovesMapping(possibleMovesMapping, coord) {
    possibleMovesMapping[coord] = {
        walks: [],
        captures: [],
        blocks: []
    };
}
