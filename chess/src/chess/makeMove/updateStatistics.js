import { updateTime } from '../time/updateTime';
import {getEnemyTeam} from './getEnemyTeam'

export function updateStatistics(gameData, team, wasPreviousMoveEndangeringKing, updatedTimes) {
    const {statistics, time, teams} = gameData;
    statistics[team].wasPreviousMoveEndangeringKing = wasPreviousMoveEndangeringKing;
    if (wasPreviousMoveEndangeringKing) return;
    
    statistics.turn++;
    statistics.movesDone++;
    const enemyTeam = getEnemyTeam(team, teams);

    statistics.moveFor = enemyTeam;
    if (updatedTimes)
        updateTime(time, updatedTimes);
}
