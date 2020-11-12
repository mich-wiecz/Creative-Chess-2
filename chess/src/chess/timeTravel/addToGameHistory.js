export function addNextGameDataToHistory(newState) {
    const { game } = newState.history;

    const { history, limit, position } = game;


    let length = history.length;

    if (position !== length - 1) {
        history.splice(position + 1);
        history.position = length - 1;
        length = history.length;
    }


    const tooMuchCount = Math.abs(length - limit - 1);
    if (tooMuchCount > 0) {
        history.splice(0, tooMuchCount);
    }

    history.push(newState.game);
    history.position++;


 
}
