
export function resetToInitial (state) {
    const {game: gameHist} = state.history;
    state.game = gameHist.initial;
    gameHist.position = 0;
    gameHist.history = [];
}