import cloneDeep from 'lodash.clonedeep';
import {functionalMovesSchemas, overriddenFunctionalMovesSchemas} from 'chess/initialState'



export function getMovesSchema(state, figureData) {
    let movesSchema;
    const { model, figure,} = figureData;
    const {name } = figure;


    if (model.hasOwnProperty('movesSchema')) {
        movesSchema = model.movesSchema;
        if (movesSchema === name) {
           movesSchema =  overriddenFunctionalMovesSchemas[name](figure)
        }
    } else {
        movesSchema = state.modelFigures.figures[name].figure.movesSchema;
        if (movesSchema === name) {
            movesSchema = functionalMovesSchemas[name](figure)
        }
    }


    return cloneDeep(movesSchema);
}
