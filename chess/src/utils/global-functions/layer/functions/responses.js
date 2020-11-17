

 //  const responses = Object.freeze({
//     default: 'default',
//     omit: 'omit',
//     cancel: 'cancel',
//     assignValue: function(value) {
//     if (value !== undefined) {
//         responses.value = value;
//     }
//     return 'assignValue';
//     }
//  })


export const responses =  Object.defineProperties({}, {
     value: {
         value: null,
         writable: true
     },
     default: {
         value: 'default'
     },
     omit: {
         value: 'omit'
     },
     cancel: {
         value: 'cancel'
     },
     assignValue: {
         value: function(value) {
            if (value !== undefined) {
                responses.value = value;
            }
            return 'assignValue';
            }
     } 
 })




/**
 * @private
 * @function    
 * @param {object} result  object that will be the result of iteration
 * @param {string | number} key key of iterated object
 * @param {string} response one of response from responses object (without omit and cancel). At this point two of responses should be already checked: omit and cancel because they directly affect iteration and because of that they are handled outside of this function
 * @param {object} responses responses object.
 * @see {@link Responses}
 * @param {function} defaultCase function that will be invoked when response is "default"; (conditional) assignment to result should happen here
 * @returns {void}
 * @throws if provided response is not found in responses object
 */
export const handleResponse = (result, key, response, responses, defaultCase) => {
    switch(response) {
        case responses.default: 
        defaultCase()
        break;
        case responses.assignValue(): (result[key] = responses.value);
        break;
        default: throw new Error(`Callback should return property from response object  but received ${response} `)
    }
 }
