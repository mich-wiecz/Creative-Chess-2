export function setTime (state, timeObject) {
    const {time} = state.game;
  for(let team in timeObject) {
    time[team].time = timeObject[team]; 
  }
  time.isTimeGame = true;
  const {initial} = state.history.game;
  initial.game.time = state.game.time;
}