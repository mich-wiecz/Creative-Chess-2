export function removeAllFigMovesFromMapping(moves, possibleMovesMapping) {
    for (let moveType in moves) {
        moves[moveType].forEach(stepSequence => {
            stepSequence.forEach(seqCoord => {
                const coordMapping = possibleMovesMapping[seqCoord][moveType];
                possibleMovesMapping[seqCoord][moveType] = coordMapping.filter(mapCoord => !mapCoord.includes(seqCoord));
            });
        });
    }
}
