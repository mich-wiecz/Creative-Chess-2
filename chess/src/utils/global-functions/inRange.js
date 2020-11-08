/**
 * Returns true or false based on whether value is between min and max or not.
 * Will return true if the value is greater or equal to min and less or equal to max
 * @public
 * @category Math
 * @function
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @returns {Boolean} true if within <min, max>
 */
export function inRange (value, min, max) {
    if (max < min) throw new Error('max have to be greater or equal to minimum');
    return value >= min && value <= max;
}