import generatePossibleMoves from '@chess/generatePossibleMoves';
import { updateFigureData } from '@chess/figures/functions';
import { removeAllFigMovesFromMapping } from './removeAllFigMovesFromMapping';

export function updateFigure(
    newState,
    figureId,
    nextCoord) {
    const { figures, possibleMovesMapping, tags } = newState.game;
    const { figure } = figures[figureId];
    const { moves: figMoves } = figure;
    removeAllFigMovesFromMapping(figMoves, possibleMovesMapping);
    updateFigureData(figure, 'position', nextCoord, tags);
    generatePossibleMoves(
        newState,
        [figureId]
    );
}
