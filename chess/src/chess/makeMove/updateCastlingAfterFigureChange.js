import { makeCoord } from 'chess/figures/functions';
import { splitCoord } from 'chess/coords';
import {getKingData} from './getKingData'

export function updateCastlingAfterFigureChange(
    state,
    figure,
    type = 'move') {
    const { moves, position, team, madeMove, name, id } = figure;
    if (madeMove || figure.hasOwnProperty('previousForm')) return;
    if (type === 'move') figure.madeMove = true;

        const {game} = state;
    const { possibleMovesMapping, castlingMonitoring, figures } = game;
    if (!castlingMonitoring[team].isCastlingPossible) return;


    if (name === "King") {
        castlingMonitoring[team] = {
            isCastlingPossible: false,
            rooks: {}
        };
        moves.castlings = [];
        const [kingCol, kingRow] = splitCoord(position);
        [kingCol - 2, kingCol + 2].forEach(castCol => {
            possibleMovesMapping[makeCoord(castCol, kingRow)].castlings = [];
        });
    }


    if (name === "Rook") {
        const monit = castlingMonitoring[team];
        const { kingNextPosition, figuresOnWay } = monit.rooks[id];
        if (figuresOnWay.length === 0) {
            const [, kingId] = getKingData(state, team);
            if(!kingId) return;
            const {moves: kingMoves} =  figures[kingId].figure;
           kingMoves.castlings =  kingMoves.castlings.filter(coord => coord !== kingNextPosition);
            possibleMovesMapping[kingNextPosition].castlings = [];
        } else {
            delete monit.rooks[id];
        }
    }


}

