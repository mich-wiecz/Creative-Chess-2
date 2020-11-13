export function removeTime (state) {
    const {game} = state;
    const defaultObj = {
        isTimeGame: false,
        timeStarted: false
    };
    game.time = defaultObj;
  const {initial} = state.history.game;
  initial.game.time = defaultObj;
}