export function removeAllFigMovesFromMapping(figId, moves, possibleMovesMapping) {
    for (let moveType in moves) {
        moves[moveType].forEach((stepSequence, seqIndex) => {
            stepSequence.forEach((coord) => {
                const coordMapping = possibleMovesMapping[coord][moveType];
                const figMappingId = figId + '##' + seqIndex;
                possibleMovesMapping[coord][moveType] = coordMapping.filter(mapId => mapId !== figMappingId);
            });
        });
    }
}
