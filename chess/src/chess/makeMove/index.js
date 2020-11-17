import { extractId } from 'chess/figures/functions.js';
import { correctOtherFigsPossibleMoves } from './correctOtherFigsPossibleMoves';
import { isMoveCapture } from './isMoveCapture';
import { killCapturedFigure } from './killCapturedFigure';
import { updateFigure } from './updateFigure';
import { addNextGameDataToHistory } from '../timeTravel/addToGameHistory';
import { checkKings } from '../kingsChecking/checkKings';
import { updateStatistics } from './updateStatistics';
import { endOfficialGame } from '../endOfficialGame';
import { updateCastlingData } from './updateCastlingData';
import { getCastlingData } from './getCastlingData';



 function logger(captured, mapping) {
    for(let coord in mapping) {
        for(let moveType in mapping[coord]) {
            mapping[coord][moveType].forEach(id => {
                const figId = id.split('##')[0];
                if (captured.findIndex(captId => captId === figId) !== -1) {
                    console.log(mapping[coord][moveType], coord, moveType, captured)
                }
            })
            
        }
        
    }
    
} 

export default function makeMove(newState, 
    {
        figureId, 
        nextCoord, 
        additional: {
            time: updatedTimes, 
            transform: transformArray
        }}) {


    let wasPreviousMoveEndangeringKing;

        const {game} = newState;
        const {
            figures, 
            boardMap, 
            possibleMovesMapping
        } = game; 



       const {figure} = figures[figureId];
       const {position, team, name, id} = figure;

 

        const [castlingFlag, rookFigure, rookNextCoord] = getCastlingData(game, figure, nextCoord);
        if (castlingFlag !== 'break') {


        const nextField = boardMap[nextCoord],
        capturedFigId = isMoveCapture(nextField) ? extractId(nextField) : null;

        boardMap[nextCoord] = boardMap[position];
        boardMap[position] = 'blanc';
        if(castlingFlag) {
            boardMap[rookNextCoord] = boardMap[rookFigure.position];
            boardMap[rookFigure.position] = 'blanc';
        }

        correctOtherFigsPossibleMoves(newState, position, nextCoord, id);
        if(castlingFlag) correctOtherFigsPossibleMoves(newState, rookFigure.position, rookNextCoord);



        updateFigure(newState, figureId, nextCoord, transformArray);
        if (castlingFlag) updateFigure(newState, rookFigure.id, rookNextCoord);


        if (game.protectKings) {

            const [isKingInDanger, isCheckmate] = checkKings(newState, team, name, nextCoord, capturedFigId);


            if (isCheckmate) endOfficialGame(game, {winner: team, reason: 'checkmate'});

            if (isKingInDanger && !isCheckmate) {
                wasPreviousMoveEndangeringKing = true;
               
                const {position, history} = newState.history.game;
                 newState.game = history[position];
            }
            
        }
        updateStatistics(game, team, wasPreviousMoveEndangeringKing, updatedTimes);
        
        if (!wasPreviousMoveEndangeringKing) {

        if (!castlingFlag) updateCastlingData(newState, figureId, nextCoord);

        if (capturedFigId) {
            console.log(1000)
            const {figure: capturedFig} = figures[capturedFigId]
            killCapturedFigure(capturedFig, newState);
        }
     
        addNextGameDataToHistory(newState);  
    }

    } else {
        const {position, history} = newState.history.game;
        newState.game = history[position];
        game.statistics[team].wasBadCastling = true;
    }
    logger(game.tags.status.captured, possibleMovesMapping)
            
}


