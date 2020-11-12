import { isStringFigure } from 'chess/figures/functions.js';

export function isMoveCapture(boardField) {
    if (isStringFigure(boardField))
        return true;
    return false;
}
