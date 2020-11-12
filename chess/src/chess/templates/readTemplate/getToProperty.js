import { makeCoord } from '@chess/coord-functions';

export function getToProperty(tempObject, splittedFromCoord) {
    const [fromCol, fromRow] = splittedFromCoord;
    if (tempObject.hasOwnProperty('to')) {
        return tempObject.to;
    } else if (tempObject.hasOwnProperty('colSpan')) {

        return makeCoord(fromCol + tempObject.colSpan, fromRow);
    } else
        throw new Error(`Cannot find a "to" or "colSpan" property in template map object: ${tempObject}. If there is a property "from" it needs to be also one of these two`);
}
