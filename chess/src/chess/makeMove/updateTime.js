export function updateTime(statistics, timeObject) {
    for (let teamName in timeObject) {
        statistics[teamName].time = timeObject[teamName];
    }
}