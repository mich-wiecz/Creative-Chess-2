/**
 * @public
 * @category Math
 * @function 
 * @param {Number} value actual value
 * @param {Number} min  minimum value
 * @param {Number} max  maximum value
 
 * @returns {Number}  min if (value < min) OR max if (value > max) OR value
 * @example 
 * clamp(2, 4, 10) // 4
 * clamp(5, 4, 0) // 0 beware
 * clamp(2, 4, 0) // 4
 */
export default function clamp (value, min, max) {
    if (value < min) {
        return Number(min);
      }
      if (value > max) {
        return Number(max);
      }
      return Number(value);
}
