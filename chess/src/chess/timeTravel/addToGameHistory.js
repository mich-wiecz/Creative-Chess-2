export function addNextGameDataToHistory(newState) {
    const { game: gameHistory } = newState.history;

    const { history, limit, position } = gameHistory;


    let length = history.length;

    if (position !== length - 1) {
        history.splice(position + 1);
        gameHistory.position = length - 1;
        length = history.length;
    }


    const tooMuchCount = length - (limit - 1);
    if (tooMuchCount > 0) {
        history.splice(0, tooMuchCount);
        gameHistory.position -= tooMuchCount;
    }

    history.push(newState.game);
    gameHistory.position++;


 
}
