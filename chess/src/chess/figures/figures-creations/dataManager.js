import { IndividualFiguresFinder, ModelFiguresFinder } from './finders';
import { Team } from './teams';
import store from 'redux/store';


const state = store.getState();

export class FiguresDataManager {

   static individualFigures = new IndividualFiguresFinder(state.game, 
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
   static modelFigures = new ModelFiguresFinder(state.modelFigures)

  static  createTeams(teamsArr, foundedModelFigures) {
        if (!Array.isArray(teamsArr)) throw new Error(`Function createTeams should take array of teams objects as first argument`);

        return teamsArr.reduce((result, team) => {
            result[team.name] = new Team(team, foundedModelFigures);
            return result;
        }, {})
    }

   static createBlackAndWhiteTeams(foundedModelFigures) {

        return this.createTeams([{name: 'black'}, {name: 'white'}], foundedModelFigures)
    }

}