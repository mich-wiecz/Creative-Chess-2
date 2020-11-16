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
import {current} from '@reduxjs/toolkit';


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
       const {position, team, name} = figure;

 

        const [castlingFlag, rookFigure, rookNextCoord] = getCastlingData(game, figure, nextCoord);
      

        if (castlingFlag === 'break') return;


        const nextField = boardMap[nextCoord],
        capturedFigId = isMoveCapture(nextField) ? extractId(nextField) : null;
        boardMap[nextCoord] = boardMap[position];
        boardMap[position] = 'blanc';

        correctOtherFigsPossibleMoves(newState, position, nextCoord);
        if(castlingFlag) correctOtherFigsPossibleMoves(newState, rookFigure.position, rookNextCoord);


        if (game.protectKings) {

            const [isKingInDanger, isCheckmate] = checkKings(newState, team, name, nextCoord);


            if (isCheckmate) endOfficialGame(game, {winner: team, reason: 'checkmate'});

            if (isKingInDanger) {
                wasPreviousMoveEndangeringKing = true;
               if (!isCheckmate) {
                   
                   const {position, history} = newState.history.game;
                   console.log(current(history), position)
                   newState.game = history[position];
               }
            }
            
        }
        updateStatistics(game, team, wasPreviousMoveEndangeringKing, updatedTimes);
        
        if (!wasPreviousMoveEndangeringKing) {

        if (!castlingFlag) updateCastlingData(newState, figureId, nextCoord);

        if (capturedFigId) {
            const {figure: capturedFig} = figures[capturedFigId]
            killCapturedFigure(capturedFig, newState);
        }
     
        updateFigure(newState, figureId, nextCoord, transformArray);
        if (castlingFlag) updateFigure(newState, rookFigure.id, rookNextCoord);
        addNextGameDataToHistory(newState);   
            
        } 
}


