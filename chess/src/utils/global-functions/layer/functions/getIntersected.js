import * as sharedModule from './shared'
import  * as responsesModule from './responses'; 

const {handleResponse, responses} = responsesModule;
const {getData} = sharedModule;

// intersected means in that case key sameness

   /**
    * 
    * @private
    * @function
    * @param {object} bottomObj the base object
    * @param {object} topObj object that will be iterated over and if the key of this object is the same as key of bottomObj the property will be added to the resultObj
    * @param {object} [resultObj] Will be returned from this function. Initially it is empty object or could contain predefined properties from prepare method. These properties are not replaceable (intersection or customization will not work).
      * @param {sharedModule.LayerIteratee} [cb] if provided will be invoked on every iteration. Most importantly the callback have to return property from the responses object. The responses object will be passed as the first argument. Two other arguments are data about bottom and top objects (value, object itself and topObj data will provide also a key property).
    * @returns {object} resultObj
    * @description This function is created to being called from  Layer class instance which provides some type checking etc.
    */
export default function getIntersected ( bottomObj, topObj, cb, resultObj ) {
        let doResultObjHasRigidValues;
        if (resultObj) {
           doResultObjHasRigidValues = true;
        } else {
           doResultObjHasRigidValues = false;
           resultObj = {};
        }
  
        let assignConditionally;
        if (doResultObjHasRigidValues) {
           assignConditionally = (key, areIntersected, value) => {
              if (areIntersected && !resultObj.hasOwnProperty(key)) 
              resultObj[key] = value
           }
        } else assignConditionally = (key, areIntersected, value) => {
           if (areIntersected) 
           resultObj[key] = value
        }
  
           for(let key in topObj) {
              if (cb) {
              const [areIntersected, topValue, bottomValue] = getData(key, topObj, bottomObj)
              const response =  cb( responses, {bottomValue, bottomObj}, {topValue, topObj, topKey: key});
              if (response === responses.omit) continue;
              if (response === responses.cancel) return resultObj;
              handleResponse(resultObj, key, response, responses, () =>  assignConditionally(key, areIntersected, topValue))
              } else {
                 const [areIntersected, topValue] = getData(key, topObj, bottomObj)
                 assignConditionally(key, areIntersected, topValue);
              }
           }
           return resultObj;
       }
  