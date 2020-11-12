let figureIndex = 0;
export function adjustFillValue(fill, adjustField) {
    if (!Array.isArray(fill)) {
        return (coord) => adjustField(coord, fill);
    }

    const length = fill.length;

    return function (coord) {
        const result = adjustField(coord, fill[figureIndex]);
        if (figureIndex >= length - 1) {
            figureIndex = 0;
        } else {
            figureIndex++;
        }

        return result;
    };
}
