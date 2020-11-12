export function findMovesSchemaDataForSequence(memoizedMovesSchema, sequenceIndex) {
    let index = -1,
        allStepsObjects = 0;
    const movesSchemaLength = memoizedMovesSchema.length;

    while (++index < movesSchemaLength) {
        const { steps: stepsArray } = memoizedMovesSchema[index],
            stepsObjectsAmount = stepsArray.length;

        allStepsObjects += stepsObjectsAmount;

        if (allStepsObjects >= sequenceIndex) {
            const stepsIndex = stepsObjectsAmount - (allStepsObjects - sequenceIndex);

            const foundedStep = stepsArray[stepsIndex],
                foundedStepsObject = memoizedMovesSchema[index];

            return [
                foundedStepsObject,
                foundedStep
            ];

        }
    }

}
