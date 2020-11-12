import { createNextState as produce } from '@reduxjs/toolkit'
import { dataStore } from '@chess/store.js';
import { extractIndex } from 'chess/figures/functions.js';
import { correctOtherFigsPossibleMoves } from './correctOtherFigsPossibleMoves';
import { isMoveCapture } from './isMoveCapture';
import { killCapturedFigure } from './killCapturedFigure';
import { updateFigure } from './updateFigure';
import { updateTime } from './updateTime';
import { addNextGameDataToHistory } from './addNextGameDataToHistory';
import { checkKings } from './checkKings';




export default function makeMove(figureId, nextCoord, additional) {

    const nextState = produce(dataStore, newState => {

        const {game} = newState;
        const {
            winner,
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


        if (
            !winner &&
            additional.hasOwnProperty('watchForTheKing') &&
            additional.watchForTheKing === true
        ) {


            const [isKingInDanger, isCheckmate] = checkKings(newState, team);


            if (isCheckmate) {
                game.winner = team;
            }

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



            if (additional.hasOwnProperty('time')) updateTime(statistics, additional.time);
            
                addNextGameDataToHistory(newState);
                statistics[team].wasPreviousMoveEndangeringKing = false;
            
    })


  

    dataStore = nextState;
    
}