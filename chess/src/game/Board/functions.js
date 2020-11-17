import {splitCoord} from '@chess/coords';
import {extractId, isStringFigure, getModelProperty} from 'chess/figures/functions';


  export function normalizeCoordForGrid(coord, boardExtremes) {
        // this is needed because Css grid is placing blocks from top left so white were in place of black
         // Now blocks are placed reversely vertically
        const { bottom, left, top } = boardExtremes,
         [col, row] = splitCoord(coord),
         colForGrid = 1 + col - left,
         absBottom = Math.abs(bottom),
         maxRow = top + absBottom + 1,
         rowForGrid = maxRow - (row + absBottom);

        return [colForGrid, rowForGrid];
    }


function getFieldColor (coordForGrid, boardMotive) {
        //  Left bottom coordinate should be "dark" (first). 
         //  Returned values below are also inverted because of css grid.
     const { first, second } = boardMotive;
 
         const [col, row] = coordForGrid;
         if(col % 2 === row % 2) {
             return second
         }
         return first;
 
     }


 function getFigureData (figures, modelFigures, field) {
        const figId = extractId(field);
        const {figure} = figures[figId];

        const pawnData = {};
        if (figure.name === "Pawn") {
            pawnData.pawnDirection = figure.direction;
        }

        return {
            imageName: getModelProperty(figures, modelFigures, figId, 'imageName'),
            color: figure.color,
            id: figId,
            team: figure.team,
            ...pawnData
        }
    }

   export function getFieldData (
        field,
        coordsForGrid,
        figures, 
        modelFigures,
        boardMotive
    ) {

        return {
            color: getFieldColor(coordsForGrid, boardMotive),
            figureData: isStringFigure(field) ? getFigureData(figures, modelFigures, field) : null
        }
    }