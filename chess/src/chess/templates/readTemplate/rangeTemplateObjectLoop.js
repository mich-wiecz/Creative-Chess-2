import { makeCoord } from '@chess/coord-functions';
import { getTemplateRangeObjectData } from './getTemplateRangeObjectData';
import { adjustFillValue } from './figureIndex';

export function rangeTemplateObjectLoop(adjustField, tempObject, cb) {
    const {
        fromCol,
        fromRow,
        fill,
        colSpan,
        rowSpan,
        colDirection,
        rowDirection
    } = getTemplateRangeObjectData(tempObject);

    const assignFill = adjustFillValue(fill, adjustField);

    let rowIndex = -1;
    outer: while (++rowIndex <= rowSpan) {
        let colIndex = -1;
        while (++colIndex <= colSpan) {
            const coord = makeCoord(
                fromCol + (colIndex * colDirection),
                fromRow + (rowIndex * rowDirection)
            );

            const response = cb(coord, () => assignFill(coord));
            if (response === 'break')
                break outer;
        }
    }


}
