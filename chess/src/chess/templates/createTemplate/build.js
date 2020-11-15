export function build (templateArray, teams, buildConfig ) {
    const teamsArray = [];
    for(let team in teams) {
        const {figuresSet: funcFiguresSet} = teams[team];
        let objectFiguresSet = {};
        for(let [figName, createFn] of Object.entries(funcFiguresSet)) {
            const {name, color} = createFn();
            objectFiguresSet[figName] = {name, color};
        }
        teamsArray.push({
            ...teams[team]._teamData,
            figuresSet: objectFiguresSet
        })
    }
    
    return {
        map: templateArray,
        buildConfig,
        teams: teamsArray
    }
}