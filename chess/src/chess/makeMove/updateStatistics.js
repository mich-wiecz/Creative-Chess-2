import { updateTime } from '../time/updateTime';
import {getEnemyTeam} from './getEnemyTeam'

export function updateStatistics(gameData, team, wasPreviousMoveEndangeringKing = false, updatedTimes) {
    if (updatedTimes) {
        updateTime(gameData, updatedTimes);
    }    
    const {statistics, teams} = gameData;
    statistics[team].wasBadCastling = false;
    statistics[team].wasPreviousMoveEndangeringKing = wasPreviousMoveEndangeringKing;
    if (wasPreviousMoveEndangeringKing) return;
    
    
    const enemyTeam = getEnemyTeam(team, teams),
    isLastTeam = team === teams[teams.length -1].name;

    if (isLastTeam) statistics.turn++;
    statistics.movesDone++;
    statistics.moveFor = enemyTeam;
}
