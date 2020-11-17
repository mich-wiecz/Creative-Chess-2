import { updateTime } from '../time/updateTime';
import {getEnemyTeam} from './getEnemyTeam'

export function updateStatistics(gameData, team, wasPreviousMoveEndangeringKing = false, updatedTimes) {
    const {statistics, time, teams} = gameData;
    statistics[team].wasPreviousMoveEndangeringKing = wasPreviousMoveEndangeringKing ;
    if (wasPreviousMoveEndangeringKing) return;
    
 
    const enemyTeam = getEnemyTeam(team, teams),
    isLastTeam = team === teams[teams.length -1].name;

    if (isLastTeam) statistics.turn++;
    statistics.movesDone++;
    statistics.moveFor = enemyTeam;
    if (updatedTimes)
        updateTime(time, updatedTimes);
}
