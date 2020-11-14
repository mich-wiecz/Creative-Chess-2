import { extractIndex } from 'chess/figures/functions.js';
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
        additional: {time: updatedTimes, transform: transformArray
        }}) {


    let wasPreviousMoveEndangeringKing;

        const {game} = newState;
        const {
            figures, 
            boardMap, 
        } = game; 



       const {figure} = figures[figureId];
       const {position, team} = figure;

 

        const [castlingFlag, {position: rookPosition, id: rookId}, rookNextCoord] = getCastlingData(game, figure, nextCoord);
      

        if (castlingFlag === 'break') return;


        const nextCoordField = boardMap[nextCoord],
        capturedFigIndex = isMoveCapture(nextCoordField) ? extractIndex(nextCoordField) : null;
        boardMap[nextCoord] = boardMap[position];
        boardMap[position] = 'blanc';

        correctOtherFigsPossibleMoves(newState, position, nextCoord);
        if(castlingFlag) correctOtherFigsPossibleMoves(newState, rookPosition, rookNextCoord);


        if (game.protectKings) {

            const [isKingInDanger, isCheckmate] = checkKings(newState, team);


            if (isCheckmate)  endOfficialGame(game, team);

            if (isKingInDanger) {
                wasPreviousMoveEndangeringKing = true;
               if (!isCheckmate) {
                   const {position, history} = newState.history.game
                   newState.game = history[position];
               }
            }
            
        }
        updateStatistics(game, team, wasPreviousMoveEndangeringKing, updatedTimes);
        
        if (!wasPreviousMoveEndangeringKing) {

        if (!castlingFlag) updateCastlingData(newState, figureId, nextCoord);

        if (capturedFigIndex) {
            const {figure: capturedFig} = figures[capturedFigIndex]
            killCapturedFigure(capturedFig, newState);
        }
     
        updateFigure(newState, figureId, nextCoord, transformArray);
        if (castlingFlag) updateFigure(newState, rookId, rookNextCoord)
        addNextGameDataToHistory(newState);   
            
        }
}


