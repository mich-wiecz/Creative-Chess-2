export function addNextGameDataToHistory(newState) {
    const { game } = newState.history;

    const { history, limit, position } = game;

    const length = history.length;

    if (position !== length - 1) {
        history.splice(position + 1);
    }

    if (length >= limit) {
        const tooMuchCount = length - limit - 1;
        history.splice(0, tooMuchCount);
    }

    history.push({ ...newState.game });
    history.position++;
}
