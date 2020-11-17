export function getFillProperty(tempObject) {
    if (tempObject.hasOwnProperty('fill')) {
        return tempObject.fill;
    } else {
        return 'blanc';
    }
}
