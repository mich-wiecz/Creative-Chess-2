
/**
 * @public
 * @function
 * @param {Object} object object to check if it is iterable or not
 * @returns {Boolean} true if iterable, otherwise false
 */
export function isIterable (object) {
  return object != null && typeof object[Symbol.iterator] === 'function'
}