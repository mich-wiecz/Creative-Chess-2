import { updateFigureData } from '@chess/figures/functions';
import { removeAllFigMovesFromMapping } from './removeAllFigMovesFromMapping';

export function killCapturedFigure(capturedFig, tags, possibleMovesMapping) {


    const updateCapturedFigure = (property, newValue) => updateFigureData(
        capturedFig,
        property,
        newValue,
        tags
    );

    updateCapturedFigure('position', null);
    updateCapturedFigure('status', 'captured');

    const { moves } = capturedFig;
    removeAllFigMovesFromMapping(moves, possibleMovesMapping);

    updateCapturedFigure('moves', {});
}
