export function updateTime(gameData, updatedTimes) {
    const {time, statistics: {moveFor: thisMoveFor}} = gameData;
    for (let teamName in updatedTimes) {
        time[teamName] = updatedTimes[teamName];
    }
    time.prevTeam = thisMoveFor;
}