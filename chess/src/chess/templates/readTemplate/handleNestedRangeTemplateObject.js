import { isPlainTemplateObject } from './isPlainTemplateObject';
import { rangeTemplateObjectLoop } from './rangeTemplateObjectLoop';
import { plainTemplateObjectLoop } from './plainTemplateObjectLoop';

export function handleNestedRangeTemplateObject(possibleMovesMapping, assignToBoardMap, adjustField, coord, tempObject, resultBoardMap, assignOuterFill) {


    for (let nestedTempObject of tempObject.nest) {
        let breakMainLoop = false;
        if (breakMainLoop)
            break;
        if (isPlainTemplateObject(nestedTempObject)) {
            plainTemplateObjectLoop(
                nestedTempObject,
                resultBoardMap,
                (nestedCoord) => {
                    if (coord === nestedCoord) {
                        assignToBoardMap(possibleMovesMapping, resultBoardMap, coord, adjustField(coord, tempObject[coord]));
                        return 'break';
                    }

                });
        } else {
            rangeTemplateObjectLoop(adjustField, nestedTempObject, (nestedCoord, assignNestedFill) => {
                if (nestedCoord === coord) {
                    assignToBoardMap(possibleMovesMapping, resultBoardMap, 
                    coord, 
                    assignNestedFill());
                    breakMainLoop = true;
                    return 'break';
                }

            });
        }

    }

    if (!resultBoardMap.hasOwnProperty(coord)) {
        assignToBoardMap(possibleMovesMapping, resultBoardMap, coord, assignOuterFill());
    }
}
