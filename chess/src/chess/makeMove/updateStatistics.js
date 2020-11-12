import { updateTime } from './updateTime';

export function updateStatistics(statistics, team, teams, time) {
    statistics[team].wasPreviousMoveEndangeringKing = false;
    statistics.turn++;
    statistics.movesDone++;
    let enemyTeam;
    for (let someTeam in teams) {
        if (someTeam !== team) {
            enemyTeam = someTeam;
        }
    }

    statistics.moveFor = enemyTeam;
    if (time)
        updateTime(time);
}
