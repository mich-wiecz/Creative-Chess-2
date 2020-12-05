export function setTime (state, timeObject) {
    const {time} = state.game;
    time.initial = {};
  for(let team in timeObject) {
    const timeForTeam = timeObject[team]
    time[team] = timeForTeam; 
    time.initial[team] = timeForTeam; 
  }
  time.timeStarted = false;
  time.isTimeGame = true;
  const {initial} = state.history.game;
  initial.time = state.game.time;

  localStorage.removeItem('firstTeamTime');
  localStorage.removeItem('secondTeamTime');
}