import { splitCoord } from 'chess/figures/functions.js';
import { getKingData } from './getKingData';

export function updateCastlingData(state, figureId, nextCoord) {

    const { castlingMonitoring, possibleMovesMapping, figures } = state.game;

    const [nextCol, nextRow] = splitCoord(nextCoord);
    for(let team in castlingMonitoring) {
        const monit = castlingMonitoring[team];
        if (!monit.isCastlingPossible) continue;


            const rooks = monit.rooks;
            const [, kingId] = getKingData(state, team);
            for (let rookId in rooks) {
                const {
                    kingNextPosition,
                    figuresOnWay,
                    row,
                    startCol,
                    endCol
                } = rooks[rookId];
    
               
                if (row === nextRow && (nextCol >= startCol && nextCol <= endCol)) {
                    if (!figuresOnWay.includes(figureId)) {
                        figuresOnWay.push(figureId);
                    } 
                    // Figure in her next position is  blocking castling
                     continue;
                }
                rooks[rookId].figuresOnWay = figuresOnWay.filter(figId => figId !== figureId);
    
    
                if (figuresOnWay.length === 0) {
                    const { moves: kingMoves } = figures[kingId].figure;
                    if (!kingMoves.hasOwnProperty('castlings')) {
                        kingMoves.castlings = [[]];
                    }
                    figures[kingId].figure.moves.castlings[0].push(kingNextPosition);
                    const mappedKingPosition = possibleMovesMapping[kingNextPosition];
                    if (!mappedKingPosition.hasOwnProperty('castlings')) {
                        mappedKingPosition.castlings = [];
                    }
                    mappedKingPosition.castlings.push(kingId + '##' + 0);
    
                }
            }
    
        
    }
    



}
