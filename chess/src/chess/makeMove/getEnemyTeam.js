export function getEnemyTeam(team, teams) {
    for (let teamName of teams) {
        if (teamName !== team)
            return teamName;
    }

}
