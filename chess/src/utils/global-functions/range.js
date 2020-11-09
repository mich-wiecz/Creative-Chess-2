/**
 * @public
 * @category Array
 * @function
 * @param {Number} start start value of array
 * @param {Number} length length of returned array
 * @param {Number} [step]  default to 1; value to be added to each previous value in the array
 * @returns {Array<Number>} numeric array of given length started from min value and then every next value is previous value + step 
 * 
 * @example
 * range(1, 5)
 * // [1, 2, 3, 4, 5]
 * range(4, 4, -1.5)
 * // [4, 2.5, 1, -0.5]
 */
export default  function range (start, length, step = 1) {
    let index = -1,
    result = [];
    start = Number(start); 
    step = Number(step);
    
      while (++index < length) {
        result[index] = start + step * index;
      }
    
      return result;
    }