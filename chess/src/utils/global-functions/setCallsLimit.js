/**
 * @public
 * @category Function
 * @function
 * @param {Function} func function that could be called only n number of times
 * @param {Number} n  how many times function can be called
 * @returns {Function} function wrapping the given function (func) providing extra checks to prevent it from being called more than n number of times
 * @throws  error if first argument is not a function
 * @example
 * const functionToLimit = () => 2 * 2
 * const stingyFunction = setCallsLimit(functionToLimit, 3)
 * stingyFunction() // 4
 * stingyFunction() // 4
 * stingyFunction() // 4
 * stingyFunction() // undefined
 * stingyFunction() // undefined
 */
export function setCallsLimit (func, n) {
    if (typeof func != 'function') {
        throw new TypeError(`First argument should be a function but received: ${func}`);
      }
    return function() {
        if (n < 1) return;
        n--;
        return func();
    }
}
