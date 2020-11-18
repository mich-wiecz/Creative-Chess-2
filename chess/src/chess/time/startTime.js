export function startTime (state) {
    state.game.time.timeStarted = true;
    state.mode = 'game';
}