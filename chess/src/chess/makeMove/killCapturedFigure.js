import { updateFigureData } from 'chess/figures/functions';
import { removeAllFigMovesFromMapping } from './removeAllFigMovesFromMapping';
import {updateCastlingAfterFigureChange} from './updateCastlingAfterFigureChange';

export function killCapturedFigure(capturedFig, state) {

    const {tags, possibleMovesMapping} = state.game;

    const {name, moves, id} = capturedFig;
    if (name === 'King' || name === "Rook") updateCastlingAfterFigureChange(state, capturedFig, 'capture');

    const updateCapturedFigure = (property, newValue) => updateFigureData(
        capturedFig,
        property,
        newValue,
        tags
    );


    removeAllFigMovesFromMapping(id, moves, possibleMovesMapping);

    updateCapturedFigure('position', null);
    updateCapturedFigure('status', 'captured');
    updateCapturedFigure('moves', {});
}
