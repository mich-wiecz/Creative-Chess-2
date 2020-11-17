

export function couldMakeNextStep(recentStepType, amount) {
    if (!recentStepType ||
        recentStepType === 'block' ||
        recentStepType === 'capture' ||
        amount < 1)
        return false;
    return true;
}
