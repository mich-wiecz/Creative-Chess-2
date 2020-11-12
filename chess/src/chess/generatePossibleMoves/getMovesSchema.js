import cloneDeep from 'lodash.clonedeep';

export function getMovesSchema(state, figure) {
    let movesSchema;
    const { model, name, position, startPosition } = figure;

    if (model.hasOwnProperty('movesSchema')) {
        movesSchema = model.movesSchema;
    } else {
        movesSchema = state.modelFigures.figures[name].figure.movesSchema;
    }

    if (typeof movesSchema === 'function') {
        movesSchema = movesSchema({
            position,
            startPosition
        });
    }

    return cloneDeep(movesSchema);
}
