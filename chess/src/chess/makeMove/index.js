import { extractIndex } from 'chess/figures/functions.js';
import { correctOtherFigsPossibleMoves } from './correctOtherFigsPossibleMoves';
import { isMoveCapture } from './isMoveCapture';
import { killCapturedFigure } from './killCapturedFigure';
import { updateFigure } from './updateFigure';
import { addNextGameDataToHistory } from '../timeTravel/addToGameHistory';
import { checkKings } from '../kingsChecking/checkKings';
import { updateStatistics } from './updateStatistics';
import { endOfficialGame } from '../endOfficialGame';
import { transformFigure } from './transformFigure';



export default function makeMove(newState, {figureId, nextCoord, additional: {time: updatedTimes, transform: transformArray}}) {


    let wasPreviousMoveEndangeringKing;

        const {game, modelFigures} = newState;
        const {
            figures, 
            possibleMovesMapping, 
            boardMap, 
            tags, 
        } = game; 


        const {figure} = figures[figureId];
        const {position, team} = figure;

        const nextCoordField = boardMap[nextCoord],
         capturedFigIndex = isMoveCapture(nextCoordField) ? extractIndex(nextCoordField) : null;
        boardMap[nextCoord] = boardMap[position];
        boardMap[position] = 'blanc';



        correctOtherFigsPossibleMoves(newState, position);


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

        if (capturedFigIndex) {
            const {figure: capturedFig} = figures[capturedFigIndex]
            killCapturedFigure(capturedFig, tags, possibleMovesMapping);
        }



        if (Array.isArray(transformArray)) {
           transformFigure(transformArray, modelFigures, figure);
        }
        updateFigure(newState, figureId, nextCoord);
        addNextGameDataToHistory(newState);   
            
        }
}