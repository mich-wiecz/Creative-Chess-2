/**
 * @public
 * @category String
 * @function
 * @param {string} string string 
 * @returns {string} provided string with first letter as uppercase
 * @example
    toUpperFirst('meow') // Meow
    toUpperFirst('MEoW') // MEoW
 */
module.exports = function toUpperFirst (string) {
    return string[0].toUpperCase() + string.slice(1);
}