export function build (templateArray, teams, buildConfig ) {
    const teamsFigures = {};
    for(let team in teams) {
        teamsFigures[team] = teams[team].figuresSet;
    }
    
    return {
        map: templateArray,
        buildConfig,
        teams: teamsFigures
    }
}