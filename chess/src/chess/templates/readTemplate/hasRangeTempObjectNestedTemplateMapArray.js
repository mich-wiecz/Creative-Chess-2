export function hasRangeTempObjectNestedTemplateMapArray(tempObject) {
    if (tempObject.hasOwnProperty('nest'))
        return true;
    return false;
}
