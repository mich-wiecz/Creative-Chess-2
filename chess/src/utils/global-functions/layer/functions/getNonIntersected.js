import * as sharedModule from './shared';
import * as responsesModule from './responses';

const {getData} = sharedModule;
const  {handleResponse, responses} = responsesModule; 

   /**
    * 
    * @private
    * @function
    * @param {object} bottomObj object that will be iterated over firstly
    * @param {object} topObj object that will be iterated over secondly
    * @param {object} [resultObj] will be returned from this function. Initially it is empty object or could contain predefined properties from prepare method. These properties are not replaceable (intersection or customization will not work).
    * @param {sharedModule.LayerIteratee} [cb] if provided will be invoked on every iteration. Most importantly the callback have to return property from the responses object. The responses object will be passed as the first argument. Two other arguments are data about bottom and top objects (value, object itself and optionally key)
    * Here there will be two iterations - first over bottomObj and second over topObj. When one object will be iterated over there will be key available in its data object and when not the key will be null so be careful about that.
    * @returns {object} resultObj
    * @description This function is created to being called from  Layer class instance which provides some type checking etc.
    */
export default function getNonIntersected(bottomObj, topObj, cb, resultObj) {
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
              if (!areIntersected && !resultObj.hasOwnProperty(key)) 
              resultObj[key] = value
           }
        } else assignConditionally = (key, areIntersected, value) => {
           if (!areIntersected) 
           resultObj[key] = value
        }

        if (cb) {
         for(let key in bottomObj) {
            const [areIntersected, topValue, bottomValue] = getData(key, topObj, bottomObj)
           const response =  cb(responses, {bottomValue, bottomObj, bottomKey: key}, {topValue, topObj, topKey: null});
           if (response === responses.omit) continue;
           if (response === responses.cancel) return resultObj;
           handleResponse(resultObj, key, response, responses, () => assignConditionally(key, areIntersected, bottomValue))
         }

           for(let key in topObj) {
            const [areIntersected, topValue, bottomValue] = getData(key, topObj, bottomObj)
            const response =  cb(responses, {bottomValue, bottomObj, bottomKey: null}, {topValue, topObj, topKey: key});
            if (response === responses.omit) continue;
            if (response === responses.cancel) return resultObj;
            handleResponse(resultObj, key, response, responses,  () =>  assignConditionally(key, areIntersected, topValue))
           }
    } else {
      for(let key in bottomObj) { 
        const [areIntersected,, bottomValue] = getData(key, topObj, bottomObj)
        assignConditionally(key, areIntersected, bottomValue)
     }

     for(let key in topObj) {
        const [areIntersected, topValue] = getData(key, topObj, bottomObj)
        assignConditionally(key, areIntersected, topValue)

         
         }
   }
        return resultObj;
     }
