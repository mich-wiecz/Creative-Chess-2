import { getPossibleMoves } from 'chess/generatePossibleMoves/getPossibleMoves';
import { findMovesSchemaDataForSequence } from './findMovesSchemaDataForSequence';


function updateMoveType (state, moveType, position) {

    const {game} = state,
    {possibleMovesMapping, figures} = game; 

    const mappingMoveArray = possibleMovesMapping[position][moveType];


    if (mappingMoveArray.length > 0) {
        mappingMoveArray.forEach(figMappingId => {

            const [otherFigId, otherFigSequenceIndex] = figMappingId.split('##'),
                { figure: otherFigure } = figures[otherFigId],
                 { moves, memoizedMovesSchema } = otherFigure.figure;

            (function removeStaleCoord() {
                const typeMoves = moves[moveType];
                if(moveType === 'walks') {
                    const coordIndex = typeMoves[otherFigSequenceIndex].findIndex(coord => coord === position);
                    moves.walks[otherFigSequenceIndex].splice(coordIndex); 
                } else {
                    moves[moveType][otherFigSequenceIndex] = [];
                }
            })();

            const [foundedStepsObject, foundedStep] = findMovesSchemaDataForSequence(memoizedMovesSchema, otherFigSequenceIndex);

            const proxyMovesSchema = [
                {
                    ...foundedStepsObject,
                    steps: [foundedStep]
                }
            ];

            const lackingMoves = getPossibleMoves(
                state,
                otherFigId,
                proxyMovesSchema,
                otherFigSequenceIndex
            );

            for (let moveType in moves) {
                moves[moveType][otherFigSequenceIndex].push(...lackingMoves[moveType][0]);
            }

        });

        possibleMovesMapping[position][moveType] = [];
    }
}



export function correctOtherFigsPossibleMoves(newState, position, nextCoord) {

    ['captures', 'blocks'].forEach( moveType => updateMoveType(newState, moveType, position));

    ['captures', 'blocks', 'walks'].forEach(moveType => updateMoveType(newState, moveType, nextCoord));

}


