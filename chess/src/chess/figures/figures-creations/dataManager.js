import { IndividualFiguresFinder, ModelFiguresFinder } from './finders';
import { Team } from './teams';


export class FiguresDataManager {


    constructor(state) {
        this.modelFiguresSet = state.modelFigures.figures;
        this.modelFigures = new ModelFiguresFinder(state.modelFigures)
        this.individualFigures = new IndividualFiguresFinder(state.game, 
            ( indFigureData) => {
            const {figure, model: overriddenModel} = indFigureData;
            let modelFigure = state.modelFigures.figures[figure.name].figure;
           const  modelData = {
                ...modelFigure,
                ...overriddenModel
            }
    
            return {
                figure,
                model: modelData
            }
        } )
        
    }



    createTeams(teamsArr, foundedModelFigures) {
        if (!Array.isArray(teamsArr)) throw new Error(`Function createTeams should take array of teams objects as first argument`);

        return teamsArr.reduce((result, team, index) => {
            const direction = index === 0 ? 'forward' : 'downward';
            result[team.name] = new Team(
                this.modelFiguresSet, 
                {...team, direction}, 
                foundedModelFigures
                );
            return result;
        }, {})
    }

    createBlackAndWhiteTeams(foundedModelFigures) {

        return this.createTeams([{name: 'white'}, {name: 'black'}], foundedModelFigures)
    }

}