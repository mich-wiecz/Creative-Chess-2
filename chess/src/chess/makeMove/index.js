import { extractIndex } from 'chess/figures/functions.js';
import { correctOtherFigsPossibleMoves } from './correctOtherFigsPossibleMoves';
import { isMoveCapture } from './isMoveCapture';
import { killCapturedFigure } from './killCapturedFigure';
import { updateFigure } from './updateFigure';
import { addNextGameDataToHistory } from '../timeTravel/addToGameHistory';
import { checkKings } from './checkKings';
import { updateStatistics } from './updateStatistics';
import { endOfficialGame } from '../endOfficialGame';


export default function makeMove(newState, {figureId, nextCoord, additional: {time}}) {


        const {game} = newState;
        const {
            teams,
            figures, 
            possibleMovesMapping, 
            boardMap, 
            tags, 
            statistics,
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


            if (isCheckmate) endOfficialGame(game, team);

            if (isKingInDanger) {
                statistics[team].wasPreviousMoveEndangeringKing = true;
               if (!isCheckmate) return;
            }
        }
        
  

        if (capturedFigIndex) {
            const {figure: capturedFig} = figures[capturedFigIndex]
            killCapturedFigure(capturedFig, tags, possibleMovesMapping);
        }


        updateFigure(newState, figureId, nextCoord);
        updateStatistics(statistics, team, teams, time);
        addNextGameDataToHistory(newState);   
            
    
}