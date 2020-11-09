import responsesModule from './responses';

/**
 * @callback LayerIteratee
 * @param {responsesModule.Responses} responses
 * @param {{bottomValue: *, bottomObj: object, bottomKey?: string | number | null}} bottomObjData 
 * @param {{topValue: *, topObj: object, topKey?: string | number | null }} topObjData 
 * @return {string} one properties of response object that will tell function what to do next
 * @throws when function will not return or if return not proper response value
 */


 /**
  * @private
  * @function
  * @param {string | number} key key of one of provided objects 
  * @param {object} topObj object
  * @param {object} bottomObj object
  * @returns {Array<boolean, *, *>} array of 3 elements: areIntersected boolean and two values from top and bottom object from the same key. If object does not have a property key, returned value will be null.
  */
export const getData = (key, topObj, bottomObj) =>  {

        const doTopObjHasKey = topObj.hasOwnProperty(key);
        const doBottomObjHasKey = bottomObj.hasOwnProperty(key);
     
        const areIntersected = doBottomObjHasKey && doTopObjHasKey;
        const topValue = doTopObjHasKey ? topObj[key] : null;
        const bottomValue = doBottomObjHasKey ? bottomObj[key] : null;
     
        return [areIntersected, topValue, bottomValue];
     }