import { isStringFigure } from 'chess/figures/functions.js';

export function getPlaygroundFigureData(state, item) {

    if (Array.isArray(item))
        return item;


    if (isStringFigure( item)) {

        const [team, name, id] = item.split('##');
        const { model, figure } = state.game.figures[id];
        const { color } = figure;
        return [name, { name: team, color }, model];
    }

    return undefined;

}
