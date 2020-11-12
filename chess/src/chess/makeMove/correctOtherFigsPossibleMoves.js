import { getPossibleMoves } from '@chess/generatePossibleMoves/getPossibleMoves';
import { findMovesSchemaDataForSequence } from './findMovesSchemaDataForSequence';

export function correctOtherFigsPossibleMoves(newState, position) {


    const { possibleMovesMapping, figures } = newState.game;

    ['captures', 'blocks'].forEach(moveType => {

        const mappingMoveArray = possibleMovesMapping[position][moveType];


        if (mappingMoveArray.length > 0) {
            mappingMoveArray.forEach(figMappingId => {

                const [otherFigId, otherFigSequenceIndex] = figMappingId.split('##'),
                    { figure: otherFigure } = figures[otherFigId];

                const { moves, memoizedMovesSchema } = otherFigure.figure;

                (function removeStaleCoord() {
                    moves[moveType] = [];
                })();

                const [foundedStepsObject, foundedStep] = findMovesSchemaDataForSequence(memoizedMovesSchema, otherFigSequenceIndex);

                const proxyMovesSchema = [
                    {
                        ...foundedStepsObject,
                        steps: [foundedStep]
                    }
                ];

                const lackingMoves = getPossibleMoves(
                    newState,
                    otherFigId,
                    proxyMovesSchema,
                    otherFigSequenceIndex
                );

                for (let moveType in moves) {
                    moves[moveType][otherFigSequenceIndex].push(...lackingMoves[moveType[0]]);
                }

            });

            possibleMovesMapping[position][moveType] = [];
        }

    });




}
