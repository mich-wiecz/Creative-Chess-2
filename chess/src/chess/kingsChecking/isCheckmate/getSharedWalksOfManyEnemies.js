export function getSharedWalksOfManyEnemies(captures, figures) {
    let sharedCoords;
    for (let mappingFigureId of captures) {
        const [enemyId, enemyMovesSequenceIndex] = mappingFigureId.split('##');
        const { moves: enemyMoves } = figures[enemyId].figure;

        if (!sharedCoords) {
            sharedCoords = enemyMoves.walks[enemyMovesSequenceIndex];
        } else {
            sharedCoords.splice(0, 0, ...enemyMoves.walks[enemyMovesSequenceIndex]);
            sharedCoords = Array.from(new Set(sharedCoords));
            if (sharedCoords.length === 0)
                return [];
        }
    }
    return sharedCoords;
}
