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
        updateStatistics(newState.game, team, wasPreviousMoveEndangeringKing, updatedTimes);
        
        if (!wasPreviousMoveEndangeringKing) {

        if (!castlingFlag) updateCastlingData(newState, figureId, nextCoord);

        if (capturedFigId) {
            const {figure: capturedFig} = figures[capturedFigId]
            killCapturedFigure(capturedFig, newState);
        }
     
        addNextGameDataToHistory(newState);  
    }

    } else {
        const {position, history} = newState.history.game;
        newState.game = history[position];
        newState.game.statistics[team].wasBadCastling = true;
    }
            
}


