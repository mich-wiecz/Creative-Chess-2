export function isPlainTemplateObject(tempObject) {
    if (tempObject.hasOwnProperty('from'))
        return false;
    return true;
}
