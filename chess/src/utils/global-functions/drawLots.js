
/**
 * Returns a value that could be one of the step between minimum and maximum, including minimum and maximum (but  maximum only when it is equal to the step).
 * All values needs to be greater than 0 except minimum that could be 0
 * @function
 * @param {Number} min
 * @param {Number} max
 * @param {Number} step  default to 1
 * @returns {Number} 
 *  * @example 
 * drawLots(1, 10, 1) 
 * // could return every integer from range 1 to 10, including 1 and 10
 * drawLots(1, 15, 4)
 * //  could return 1, 5, 9, 13 
 */
export  function drawLots (min, max, step = 1) {
    if (min < 0 || step <= 0 || max <= 0) throw new Error('provided values cannot be less or equal to 0 except minimum that could be 0');
    if(max <= min) throw new Error('maximum should be always greater than minimum')
    const difference = max - min;
    if (step > difference) throw new Error('step have to be less than difference between maximum and minimum');
    const range = Math.floor((difference + 1) / step);
    return (min + Math.floor(Math.random() * range)) * step;
}