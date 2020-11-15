import { makeCoord, splitCoord } from 'chess/coords';
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


    const { game} = state;

    const {figures, possibleMovesMapping, boardMap} = game,
    {team, position} = figures[figureId].figure,
     [figCol, figRow] = splitCoord(position);
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

            let recentStepType, stepCount = 1;

            const sequenceMoves = {
                walks: [],
                captures: [],
                blocks: []
            };


            do {
                const newCoord = makeCoord(figCol + colMove * stepCount, figRow + rowMove * stepCount);
                stepCount++;
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
