import { createIndividualFigure } from '@figures/figures-creations/create-functions/individualFigures';
import { getPlaygroundFigureData } from './getPlaygroundFigureData';

export function playgroundAdjustField(state, coord, fieldValue) {

    const figureData = getPlaygroundFigureData(fieldValue);
    if (figureData) {
        return createIndividualFigure(state, coord, ...fieldValue);
    } else {
        return fieldValue;
    }
}
