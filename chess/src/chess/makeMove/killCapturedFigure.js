import { updateFigureData } from '@chess/figures/functions';
import { removeAllFigMovesFromMapping } from './removeAllFigMovesFromMapping';
import {updateCastlingAfterFigureChange} from './updateCastlingAfterFigureChange';

export function killCapturedFigure(capturedFig, state) {

    const {tags, possibleMovesMapping} = state.game;

    const {name} = capturedFig;
    if (name === 'King' || name === "Rook") updateCastlingAfterFigureChange(state, capturedFig, 'capture');

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
