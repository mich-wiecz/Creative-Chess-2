import { splitCoord } from 'chess/coords';
import { getToProperty } from './getToProperty';
import { getFillProperty } from './getFillProperty';

export function getTemplateRangeObjectData(tempObject) {
    const { from } = tempObject;
    const [fromCol, fromRow] = splitCoord(from);
    const to = getToProperty(tempObject, [fromCol, fromRow]);
    const [toCol, toRow] = splitCoord(to);
    const fill = getFillProperty(tempObject);

    const colDifference = Math.abs(toCol - fromCol),
        rowDifference = Math.abs(toRow - fromRow);

    let colSpan = Math.abs(colDifference),
        rowSpan = Math.abs(rowDifference);

    const colDirection = Math.sign(colDifference),
        rowDirection = Math.sign(rowDifference);

    return {
        from,
        to,
        fromCol,
        toCol,
        fromRow,
        toRow,
        fill,
        colSpan,
        rowSpan,
        colDirection,
        rowDirection
    };


}
