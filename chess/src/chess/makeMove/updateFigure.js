import generatePossibleMoves from 'chess/generatePossibleMoves';
import { updateFigureData } from 'chess/figures/functions';
import { removeAllFigMovesFromMapping } from './removeAllFigMovesFromMapping';
import { updateCastlingAfterFigureChange } from './updateCastlingAfterFigureChange';
import { transformFigure } from './transformFigure';


export function updateFigure(
    newState,
    figureId,
    nextCoord,
    transformArray
    ) {
    const { figures, possibleMovesMapping, tags } = newState.game;
    const { figure } = figures[figureId];
    const { moves: figMoves, name } = figure;


    if (name === 'King' || name === "Rook") 
    updateCastlingAfterFigureChange(newState, figure, 'move');


    if (Array.isArray(transformArray) && transformArray[0]) {
        transformFigure(transformArray, newState, figures[figureId]);
     }


    removeAllFigMovesFromMapping(figureId, figMoves, possibleMovesMapping);
    updateFigureData(figure, 'position', nextCoord, tags);
    generatePossibleMoves(
        newState,
        [figureId],
        'no-castling'
    );
}
