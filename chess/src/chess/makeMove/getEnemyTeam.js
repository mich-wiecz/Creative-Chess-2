export function getEnemyTeam(team, teams) {
    const {name} = teams.find(({name}) => {
        return name === team;
    })
    return name;

}
