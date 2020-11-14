import { makeCoord, splitCoord } from 'chess/figures/functions.js';

export function getCastlingData(gameData, figure, nextCoord) {

    const { castlingMonitoring, figures, possibleMovesMapping } = gameData,
        { name, moves, position, team } = figure;

    let castlingFlag, rookNextCoord, rookFigure;

    if (name === "King" &&
        castlingMonitoring[team].isCastlingPossible &&
        moves.castlings &&
        moves.castlings.includes(nextCoord)) {
        let foundedRookId;
        const { rooks } = castlingMonitoring[team].rooks;
        for (let rookId in rooks) {
            if (rooks[rookId].nexKingPosition === position) {
                foundedRookId = rookId;
                break;
            }
            throw new Error(`The is data proving that this should be castling but there is not matching rook`);
        }
        rookFigure = figures[foundedRookId].figure;
        const { position: rookPos } = rookFigure,
            [rookCol, rookRow] = splitCoord(rookPos);



        let [nextCol] = splitCoord(nextCoord);
        const [kingCol, kingRow] = splitCoord(position),
            direction = rookCol > kingCol ? -1 : 1;

        rookNextCoord = makeCoord(nextCol + direction, rookRow);


        while (nextCol !== kingCol) {
            nextCol += direction;
            const { walks } = possibleMovesMapping[makeCoord(nextCol, kingRow)];
            if (walks.length === 0)
                continue;
            for (let figMappingId of walks) {
                const [figId] = figMappingId.split('##');
                if (figures[figId].figure.team !== team) {
                    castlingFlag = 'break';
                    break;
                }
            }

        }
        castlingFlag = true;
    } else {
        castlingFlag = false;
    }

    return [castlingFlag, rookFigure, rookNextCoord];

}
