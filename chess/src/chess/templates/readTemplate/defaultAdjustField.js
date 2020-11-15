import { createIndividualFigure } from 'chess/figures/figures-creations/create-functions/individualFigures';
import { hasFigureData } from './hasFigureData';

export function defaultAdjustField(state, coord, fieldValue) {
    
    if (hasFigureData(fieldValue)) {
        return createIndividualFigure(state, coord, ...fieldValue);
    } else {
        return fieldValue;
    }
}
