import { isPlainTemplateObject } from './isPlainTemplateObject';
import { getFunctionData } from './getFunctionData';
import { hasRangeTempObjectNestedTemplateMapArray } from './hasRangeTempObjectNestedTemplateMapArray';
import { rangeTemplateObjectLoop } from './rangeTemplateObjectLoop';
import { plainTemplateObjectLoop } from './plainTemplateObjectLoop';
import { handleNestedRangeTemplateObject } from './handleNestedRangeTemplateObject';

export function getGameDataFromTemplate(state, template, config) {


    const { teams } = template;
    const {
        extremes,
        assignToBoardMap,
        possibleMovesMapping,
        adjustField,
        templateMapArray
    } = getFunctionData(state, template, config);




    const resultBoardMap = templateMapArray.reduce((boardMap, tempObject) => {
        if (isPlainTemplateObject(tempObject)) {
            plainTemplateObjectLoop(tempObject, (coord) => {
                assignToBoardMap(boardMap, coord, adjustField(state, coord, tempObject[coord]));
            });
        } else {
            rangeTemplateObjectLoop(adjustField, tempObject, (coord, assignFill) => {
                if (hasRangeTempObjectNestedTemplateMapArray(tempObject)) {
                    handleNestedRangeTemplateObject(assignToBoardMap, adjustField, coord, tempObject, boardMap, assignFill);
                } else {
                    assignToBoardMap(boardMap, coord, assignFill());
                }
            });
        }
        return boardMap;
    }, {});


    return {
        possibleMovesMapping,
        teams: teams ? teams : [],
        boardExtremes: extremes,
        boardMap: resultBoardMap,
    };


}
