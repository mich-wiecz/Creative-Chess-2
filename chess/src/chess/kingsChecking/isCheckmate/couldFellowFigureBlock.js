export function couldFellowFigureBlock(coords, possibleMovesMapping, figures, kingTeam, kingId) {
    for (let coord of coords) {
        const { walks } = possibleMovesMapping[coord];
        if (walks.length > 0) {
            for (let mappingFigureId of walks) {
                const [figId] = mappingFigureId.split('##');
                if(figId === kingId) continue;
                const { team } = figures[figId].figure;
                if (team === kingTeam)
                    return true;
            }

        }

    }
    return false;
}
