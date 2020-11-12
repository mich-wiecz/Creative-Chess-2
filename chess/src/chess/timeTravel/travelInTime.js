
export function travelInTime (state, cb) {
    
    const {history, position} = state.history.game;
    const wantedPosition = cb(position);
    if (wantedPosition < 0 || wantedPosition > history.length + 1) return;
    state.game = history[wantedPosition];
}


