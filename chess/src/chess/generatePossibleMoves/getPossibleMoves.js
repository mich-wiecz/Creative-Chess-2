import { makeCoord, splitCoord } from 'chess/templates/readTemplate/node_modules/@chess/coord-functions';
import { couldMakeNextStep } from './couldMakeNextStep';
import { getExcludedStepType } from './getExcludedStepType';
import { getMovements } from './getMovements';
import { getStepType } from './getStepType';



export function getPossibleMoves(
state,
figureId,
movesSchema,
sequenceIndexStart
) {




    const {figures, possibleMovesMapping, boardMap} = state.game,
    {team, startPosition} = figures[figureId],
     [figCol, figRow] = splitCoord(startPosition);
    let sequenceIndex = sequenceIndexStart || 0;

    const allMoves = {
        walks: [],
        captures: [],
        blocks: []
    };

    movesSchema.forEach(stepsObject => {

        let { steps, amount } = stepsObject;
        const excludedStepType = getExcludedStepType(stepsObject);

        steps.forEach(step => {

              const [colMove, rowMove] = getMovements(step);

            let recentStepType;

            const sequenceMoves = {
                walks: [],
                captures: [],
                blocks: []
            };


            do {
                const newCoord = makeCoord(figCol + colMove, figRow + rowMove);
                recentStepType = getStepType(newCoord, boardMap, team);
                if (!recentStepType || recentStepType === excludedStepType)
                    continue;
                const pluralStepType = recentStepType + 's';
                sequenceMoves[pluralStepType].push(newCoord);
                possibleMovesMapping[newCoord][pluralStepType].push(figureId + '##' + sequenceIndex);
                amount--;
            } while (couldMakeNextStep(recentStepType, amount));


            for (let moveType in allMoves) {
                allMoves[moveType].push(sequenceMoves[moveType]);
            }

            sequenceIndex++;

        });



    });

    return allMoves;

}
