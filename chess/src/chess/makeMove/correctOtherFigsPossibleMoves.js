
import { getPossibleMoves } from 'chess/generatePossibleMoves/getPossibleMoves';
import { findMovesSchemaDataForSequence } from './findMovesSchemaDataForSequence';


   function singleCoordRemoval(figMappingId, moveType, moves, seqIndex, possibleMovesMapping) {
    const sequence = moves[moveType][seqIndex];
    if (sequence.length > 0) {
        const coord = sequence[0];
        possibleMovesMapping[coord][moveType] = possibleMovesMapping[coord][moveType].filter(mappingId => mappingId !== figMappingId)
        moves[moveType][seqIndex] = [];

        moves[moveType][seqIndex] = [];
    }       
    }



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

            (function removeStaleCoords() {
                const typeMoves = moves[moveType];
                if(moveType === 'walks' || moveType === 'potentialCaptures') {
                    let coordIndex = typeMoves[figSequenceIndex].findIndex(coord => coord === position);
                   const staleSequence =  moves[moveType][figSequenceIndex].splice(coordIndex);

                staleSequence.forEach((coord) => {
                    const coordMapping = possibleMovesMapping[coord];
                    coordMapping[moveType] = coordMapping[moveType].filter(
                        mappingFigId => mappingFigId !== figId + '##' +(figSequenceIndex))
                })
                singleCoordRemoval(figMappingId, 'captures', moves, figSequenceIndex, possibleMovesMapping);
                    
                } else {
                    singleCoordRemoval(figMappingId, moveType, moves, figSequenceIndex, possibleMovesMapping);
                }
            })();


            const [foundedStepsObject, foundedStep] = findMovesSchemaDataForSequence(memoizedMovesSchema, figSequenceIndex);

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
                if (moveType === 'castlings') continue;
                // Adding coords to possibleMovesMapping was done internally
                moves[moveType][figSequenceIndex].push(...lackingMoves[moveType][0]);
            }
            
        });

    }
}



export function correctOtherFigsPossibleMoves(newState, position, nextCoord, movedFigId) {

    ['captures', 'blocks'].forEach( moveType => updateMoveType(newState, moveType, position));

    ['captures', 'blocks', 'walks', 'potentialCaptures'].forEach(moveType => updateMoveType(newState, moveType, nextCoord, movedFigId));

}


