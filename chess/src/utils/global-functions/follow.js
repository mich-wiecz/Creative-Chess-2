/**
 * @public
 * @category Math
 * @function 
 * @param {Number} spy  value that will change proportionally 
 * to the: (followed + followedMovement) / followed [change ratio / delta]
 * @param {String} shouldNeverBeZero default is to "never zero". 
 * It handles the case when followedNumber + followedNumberChange is equal to 0. 
 * With the value of shouldNeverBeZero as 'never zero' it will take the value of Number.EPSILON instead with the sign (+/-) of change. If you change it to whatever else it means it will always then returns 0, because computation of returned value is based on multiplication.
 * 
 * About Number.EPSILON: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON}
 * @returns {Function} return the function that will take the followed number before change and its change and it will return the spy number after proper, proportional change.
 */
export  function follow(spy, shouldNeverBeZero = 'never zero') {
    /**
 * @function 
 * @param {number} followed  value of followed before change
 * @param {number} followedChange the change of followed  
 * @returns {number} spy number after proportional change
 */
    return function (followed, followedChange) {
        let afterChange = followed + followedChange;
        if (afterChange === 0) {
            if (shouldNeverBeZero === 'never zero') {
                afterChange = Number.EPSILON * Math.sign(followedChange)
            } else return 0;
        }
        const changeRatio = afterChange / followed;
        return spy * changeRatio;
    }
}