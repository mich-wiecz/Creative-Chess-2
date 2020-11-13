export function updateTime(time, updatedTimes) {
    for (let teamName in updatedTimes) {
        time[teamName] = updatedTimes[teamName];
    }
}