import { getPossibleMoves } from 'chess/generatePossibleMoves/getPossibleMoves';
import { findMovesSchemaDataForSequence } from './findMovesSchemaDataForSequence';
import {current} from '@reduxjs/toolkit'


function updateMoveType (state, moveType, position) {

    const {game} = state,
    {possibleMovesMapping, figures} = game; 

    const mappingMoveArray = [...possibleMovesMapping[position][moveType]];


    if (mappingMoveArray.length > 0) {

        possibleMovesMapping[position][moveType] = [];


        mappingMoveArray.forEach(figMappingId => {
            const [figId, figSequenceIndex] = figMappingId.split('##');
           
              const  { figure } = figures[figId];
               const  { moves, memoizedMovesSchema } = figure;


               if (!moves.hasOwnProperty(moveType)) console.log(current(moves), current(figure), figId, moveType);
            (function removeStaleCoords() {
                const typeMoves = moves[moveType];
                if(moveType === 'walks' || moveType === 'potentialCaptures') {
                    const coordIndex = typeMoves[figSequenceIndex].findIndex(coord => coord === position);
                    moves.captures[figSequenceIndex] = [];
                    moves[moveType][figSequenceIndex].splice(coordIndex); 
                } else {
                   
                    moves[moveType][figSequenceIndex] = [];
                }
            })();

            const getLog = (type) => {
              return ( type === 'potentialCaptures' ?  (sth) => console.log(sth) : () => null);
            } 

            const [foundedStepsObject, foundedStep] = findMovesSchemaDataForSequence(memoizedMovesSchema, figSequenceIndex, moveType, getLog);

            const proxyMovesSchema = [
                {
                    ...foundedStepsObject,
                    steps: [foundedStep]
                }
            ];

            const lackingMoves = getPossibleMoves(
                state,
                figId,
                proxyMovesSchema,
                figSequenceIndex
            );

            for (let moveType in moves) {
                moves[moveType][figSequenceIndex].push(...lackingMoves[moveType][0]);
            }

        });

    }
}



export function correctOtherFigsPossibleMoves(newState, position, nextCoord) {

    ['captures', 'blocks'].forEach( moveType => updateMoveType(newState, moveType, position));

    ['captures', 'blocks', 'walks', 'potentialCaptures'].forEach(moveType => updateMoveType(newState, moveType, nextCoord));

}


