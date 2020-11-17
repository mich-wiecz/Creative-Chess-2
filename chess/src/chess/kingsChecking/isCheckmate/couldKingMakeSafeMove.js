

export function couldKingMakeSafeMove(kingMoves, possibleMovesMapping, figures, kingTeam) {
    for (let moveType of ['walks', 'captures']) {
        const movesSequences = kingMoves[moveType];
        for (let movesSequence of movesSequences) {
            for (let coord of movesSequence) {
                const { captures } = possibleMovesMapping[coord];
                if (captures.length === 0)
                    return false;
                for (let figureMappingId of captures) {
                    const [figureId] = figureMappingId.split('##');
                    const { team } = figures[figureId].figure;
                    if (team === kingTeam)
                        return false;
                }

            }

        }

    }
}
