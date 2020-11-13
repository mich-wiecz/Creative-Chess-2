export function build (templateArray, teams, buildConfig ) {
    const teamsArray = [];
    for(let team in teams) {
        teamsArray.push({
            ...teams[team]._teamData,
            figuresSet: {...teams[team].figuresSet}
        })
    }
    
    return {
        map: templateArray,
        buildConfig,
        teams: teamsArray
    }
}