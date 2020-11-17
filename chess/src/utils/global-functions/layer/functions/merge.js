import * as sharedModule from './shared';
import * as responsesModule from './responses';
const {getData} = sharedModule;
const  {handleResponse, responses} = responsesModule; 


   /**
    * Basically it is just Object.assign(bottomObj, topObj, resultObj) but also with option to customize it by providing a callback to every iteration.
    * It mutates the bottomObj.
    * @private
    * @function
    * @param {object} bottomObj the base object
    * @param {object} topObj object that will be iterated over and merged with bottomObj in the process
    * @param {object} resultObj here resultObj could contains predefined properties (from prepare method) and will be always included in the returned object and in this function it will be just assigned to bottomObj at the end.
    * @param {sharedModule.LayerIteratee} [cb] if provided will be invoked on every iteration. Most importantly the callback have to return property from the responses object. The responses object will be passed as the first argument. Two other arguments are data about bottom and top objects (value, object itself and topObj data will provide also a key property).
    * @returns {object} modified bottomObj (mutably)
    * @description This function is created to being called from  Layer class instance which provides some type checking etc.
    */
  export default  function merge(bottomObj, topObj, cb, resultObj = {}) {
        if (cb) {
           for(let key in topObj) {
                 const [areIntersected, topValue, bottomValue] = getData(key, topObj, bottomObj)
                 const response =  cb(responses, {bottomValue, bottomObj}, {topValue, topObj, topKey: key});
               
                 if (response === responses.omit){
                    if (areIntersected) delete bottomObj[key]
                    continue;
                 }
                 if (response === responses.cancel) {
                    if (areIntersected) delete bottomObj[key]
                    return Object.assign(bottomObj, resultObj);
                 }
                 console.log(response)
                 handleResponse(bottomObj, key, response, responses, () => {bottomObj[key] = bottomValue});
           }
           return Object.assign(bottomObj, resultObj);
           
        }
       return Object.assign(bottomObj, topObj, resultObj) 
    }