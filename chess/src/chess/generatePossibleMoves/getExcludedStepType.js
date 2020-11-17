

export function getExcludedStepType(stepsArray) {
    if (stepsArray.hasOwnProperty('type')) {
        if (stepsArray.type === 'walk')
            return 'capture';
        return 'walk';
    }
    return null;
}
