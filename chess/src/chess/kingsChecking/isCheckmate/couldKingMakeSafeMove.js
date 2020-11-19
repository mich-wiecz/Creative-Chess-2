


export function couldKingMakeSafeMove(kingMoves, possibleMovesMapping, figures, kingTeam) {
    for (let coord of kingMoves.walks.flat()) {
        const { walks} = possibleMovesMapping[coord];
        let haveEnemyWalk = false;
        for (let figureMappingId of walks) {
            const [figureId] = figureMappingId.split('##');
            const { team } = figures[figureId].figure;
            if (team !== kingTeam) {
                haveEnemyWalk = true;
                break;
            }
        }
        if (!haveEnemyWalk) {
            return true;
        } 
    } 

    for (let coord of kingMoves.captures.flat()) {
        const { blocks} = possibleMovesMapping[coord];
        if (blocks.length === 0) {
            return true;
        }
    }

    return false;
}
