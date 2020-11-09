import merge from './functions/merge';
import getIntersected from './functions/getIntersected';
import getNonIntersected from './functions/getNonIntersected';
import sharedModule from './functions/shared';

function isFunctionOrArray (obj) {
return obj && (typeof obj === 'function' || Array.isArray(obj))
}

function isObject (obj) {
    return obj && typeof obj === 'object';
};

const isValidObj = (obj) => {
   return isObject(obj) && !isFunctionOrArray(obj)
  }

/**
 * constructor will take the object and provide methods that could  manipulate this object
 * @private
 * @class
 */
export default class Layer {

    _resultObj = undefined;

 

     constructor(bottomObj) {
        if(!isValidObj(bottomObj)) throw new Error(`Passed item is not iterable. Item: ${bottomObj}`)
        this.bottomObj = bottomObj;
     }


    /**
      * Provides a default template for most of the methods in Layer
      * @inner
      * @param {Object} topObj
      * @param {Function} func function to invoke
      * @returns {Layer} return Layer instance with the result object from invoked function
      * @throws when passed object in not an object or object but function or array
      */
    _defaultLayerMethod(topObj, func) {
     if(!isValidObj(topObj)) 
     throw new Error(`Passed item should be object which is not an array nor function. Received: ${topObj}`)
     const result = func();
     return (new Layer(result)); 
    }

    /**
     * 
    * Basically it is just Object.assign(bottomObj, topObj, preparedObj?) but also with option to customize it by providing a callback to every iteration.
    * It mutates the bottom object but by default is still immutably because the bottom object is initially a clone of object provided by you to layer function. You could modify really passed object by providing third argument to layer function as 'not-immutably'.
    * If you called prepare method before and added properties to the second object, these properties will be always included in the returned object and in the merge method it will be just assigned to bottomObj at the end.
    * @function
    * @param {object} topObj object that will be iterated over and merged with bottomObj in the process
    * @param {sharedModule.LayerIteratee} [cb] if provided will be invoked on every iteration. Most importantly the callback have to return property from the responses object. 
    * 
    * Possible responses:
    * * omit: omit this key (will not work on predefined properties from prepare method) and continue to next iteration
    * * cancel: immediately return the result object (will still contains the predefined properties)
    * * default: will remain the default behaviour and this is because function needs to return something
    * * assignValue: this is function -> return response assignValue(100); could take any value
    * The responses object will be passed as the first argument. 
    * Two other arguments are data about bottom and top objects:
    * 
    * bottom object data: 
    * * bottomValue: value in actual key and because iteration is over topObj it could be undefined
    * * bottomObj
    * 
    * top object data:
    * * topValue: value in topObj key
    * * topObj
    * * topKey
    * @returns {object} modified bottomObj
    * @throws if passed object is not object or when object but function or array (not allowed)
    * @example 
    * //To simplify - lets say that bottomObj = {a: 1, b: 2}
    * bottomObj.merge({a: 5, c: 3}) // {a: 5, b: 2, c: 3}
    * bottomObj.merge({a: 5, c: 3}, 
    * (responses, {bottomValue, bottomObj}, {topValue, topObj, topKey}) => {
    *    if (topKey === 'a') return responses.assignsValue(100))
    *    if (bottomValue && bottomValue === 2) return responses.omit // you need to check because if objects dont have the same key (are not intersected), bottomObjValue will be undefined
    *    return responses.default // always needs to return a value
    *    }) // {a: 100, b: 2, c: 3} Note that b is still 2. Thats because iteration is over topObj and topObj does not have this key.
    */
     merge(topObj, cb) {
      return this._defaultLayerMethod(topObj, () => merge(this.bottomObj, topObj, cb, this._resultObj))
     };
     
   /**
    * Returns the new object with intersected keys with values from topObj.
    * @function
    * @param {object} topObj object that will be iterated over and if the key of this object is the same as key of bottom object the property will be added to the resultObj
    * @param {sharedModule.LayerIteratee} [cb] if provided will be invoked on every iteration. Most importantly the callback have to return property from the responses object. 
    * 
   * Possible responses:
    * * omit: omit this key (will not work on predefined properties from prepare method) and continue to next iteration
    * * cancel: immediately return the result object (will still contains the predefined properties)
    * * default: will remain the default behaviour and this is because function needs to return something
    * * assignValue: this is function -> return responses.assignValue(100); could take any value
    * The responses object will be passed as the first argument. 
    * Two other arguments are data about bottom and top objects:
    * 
    * bottom object data: 
    * * bottomValue: value in actual key and because iteration is over topObj it could be undefined
    * * bottomObj
    * 
    * top object data:
    * * topValue: value in topObj key
    * * topObj
    * * topKey
    * 
    * @returns {object} new object or extended object from prepare method (if you called prepare method before and added properties to the second object, these properties will be always included in the returned object)
    * 
    * @example
    * //To simplify - lets say that bottomObj = {a: 1, b: 2}
    * bottomObj.getIntersected({a: 5, c: 3}) // {a: 5}
    * bottomObj.getIntersected({a: 5, c: 3}, 
    * (responses, {bottomValue, bottomObj}, {topValue, topObj, topKey}) => {
    *    if (topKey === 'c') return responses.assignValue(100)
    *    if (bottomValue) return responses.assignValue(bottomValue) // if bottomValue is not null it means that objects are intersected at that key
    *    return responses.default // always needs to return a value
    *    }) // {a: 1, c: 100} // note that bottomObj did not have c key but responses always affects directly result object
    */
     getIntersected(topObj, cb) {
      return  this._defaultLayerMethod(topObj, () => getIntersected(this.bottomObj, topObj, cb, this._resultObj))
     }h

        /**
    * Returns the new object with non-intersected keys of bottomObj and topObj. Both bottomObj and topObj will be iterated over which means that you could refer to keys of both in the callback function but not at the same time. Non-intersected key means that second object do not have the same key as first.
    * @function
    * @param {object} topObj object 
    * @param {sharedModule.LayerIteratee} [cb] if provided will be invoked on every iteration. Most importantly the callback have to return property from the responses object. 
    * 
   * Possible responses:
    * * omit: omit this key (will not work on predefined properties from prepare method) and continue to next iteration
    * * cancel: immediately return the result object (will still contains the predefined properties)
    * * default: will remain the default behaviour and this is because function needs to return something
    * * assignValue: this is function -> return responses.assignValue(100); could take any value
    * The responses object will be passed as the first argument. 
    * Two other arguments are data about bottom and top objects:
    * 
    * bottom object data: 
    * * bottomValue: value in actual key and because iteration is over topObj it could be undefined
    * * bottomObj
    * * bottomKey: when iterating over bottomObj (as first), then is null
    * 
    * top object data:
    * * topValue: value in topObj key
    * * topObj
    * * topKey: when iterating over topObj (lastly), before is null
    * 
    * @returns {object} new object or extended object from prepare method (if you called prepare method before and added properties to the second object, these properties will be always included in the returned object)
    * 
    * @example
    * //To simplify - lets say that bottomObj = {a: 1, b: 2}
    * bottomObj.getNonIntersected({a: 5, c: 3}) // {b: 2, c: 3}
    * bottomObj.getNonIntersected({a: 5, c: 3}, 
    * (responses, {bottomValue, bottomObj, bottomKey}, {topValue, topObj, topKey}) => {
    *    if (topKey === 'c') return responses.cancel // first iteration over bottomObj so topKey will be at first null
    *    const areIntersected = (bottomKey !== null && topObj.hasOwnProperty(bottomKey)) || (topKey !== null && bottomObj.hasOwnProperty(topKey))
    *    if (areIntersected) return responses.assignValue("intersected") // 
    *    return responses.default // always needs to return a value
    *    }) // {a: "intersected", b: 2}
    */
     getNonIntersected(topObj, cb) {
       return this._defaultLayerMethod(topObj, () => getNonIntersected(this.bottomObj, topObj, cb, this._resultObj))
     }

     /**
      * Take callback and providing bottomObj and resultObj: if called for the first time will be {}
      * You should return [maybeModifiedBottomObj, maybeModifiedResultObj]. Then maybeModifiedBottomObj will replace bottomObj. 
      * If you add properties to resultObj these properties are guaranteed to be returned in next method (if it is not prepare method again)
      * @function
      * @param {PrepareCallback} cb
      * @returns this class enabling further chaining
      * @throws when you do not return an array with 2 objects 
      * 
      * @example 
      * //To simplify - lets say that bottomObj = {a: 1, b: 2}
      * bottomObj
      * .prepare((bottomObj, resultObj) => {
      *  bottomObj.d = 6 // if you do not specify third argument to layer function as 'not-immutable' here you can be sure that you are working on copy of bottomObj
      * return [bottomObj, resultObj]
      * }) 
      * .merge({a: 5, c: 3}) // {a: 5, b: 2, c: 3, d: 6}
      * 
      * bottomObj
      * .prepare((bottomObj, resultObj) => {
      * resultObj.a = resultObj.b = 10;
      * return [bottomObj, resultObj]
      * })
      * .prepare((bottomObj, resultObj) => {
      * // here resultObj will be {a: 10, b: 10} 
      * bottomObj.z = "hello world"
      * }) 
      * .merge({a: 5, c: 3}) // {a: 10, b: 10, c: 3, z: 'hello world'}
      */
     prepare(cb) {
        const objArr = cb(this.bottomObj, this._resultObj === undefined ? {} : this._resultObj);
        if(!Array.isArray(objArr) || objArr.length !== 2) 
        throw new Error(`prepare method should return array with bottomObject and resultObject (manipulated or in passed form). Received: ${objArr}`);
        const [bottomObj, resultObj] = objArr;
        if(!isValidObj(bottomObj) && !isValidObj(resultObj)) 
        throw new Error(`One or both of passed item to array in prepare method is not iterable object. Items: ${bottomObj} and ${resultObj}`)
        this.bottomObj = bottomObj;
        this._resultObj = resultObj;
        return this;
     }

     getProxyLayer () {
        return {
         composition: [],
         merge: function(cb) {
            this.composition.push((bottomLayerObj, topObj) => bottomLayerObj.merge(topObj, cb))
            return this;
           },
         getIntersected: function(cb) {
           this.composition.push((bottomLayerObj, topObj) => bottomLayerObj.getIntersected(topObj, cb)); 
           return this
        },
        getNonIntersected: function(cb) {
            this.composition.push((bottomLayerObj, topObj) => bottomLayerObj.getNonIntersected(topObj, cb)); 
           return this
        },
         prepare: function(cb) {
            this.composition.push((bottomLayerObj) => bottomLayerObj.prepare(cb)); 
           return this
        }
        }
     }

     /**
      * @function
      * @param {Array<object>} objArray array of top objects 
      * @param {function} cb You should return this callback from this function. It imitates the behaviour of layer callback function. It gives you an object with all methods available. Just use this methods normally as with one object but actually these methods will be patterns applied to every object in the array.
      * 
      * @example 
      * layer(bottomObj, bottomObj => {
      * return bottomObj
      * .layerEachByPatter(
      * [
      * {a: 1, b: 2}, 
      * {c: 3, d:4}
      * ],
      * bottomObjImitator => {
      *  return bottomObjImitator 
      *        .prepare(bottomObj => [bottomObj, {a: 20}])
      *        .merge()
      *        .getIntersected((responses) => return responses.default) 
      *    })
      * })
      * 
      * // The above is the same as calling:
     * layer(bottomObj, bottomObj => {
      * return bottomObj
      *        .prepare(bottomObj => [bottomObj, {a: 20}])
      *        .merge({a: 1, b: 2})
      *        .getIntersected({a: 1, b: 2}, (responses) => return          responses.default) 
      * // And exactly the same with other object
      *        .prepare(bottomObj => [bottomObj, {a: 20}])
      *        .merge({c: 3, d:4})
      *        .getIntersected({c: 3, d:4}, (responses) => return          responses.default) 
      *    })
      * })
      * )
      * // Note that within layerEachByPatter you do not need to specify topObj because it will be taken automatically from array. But if you do, everything also will work.
      * 
      */
    layerEachByPattern(objArray, cb) {
     if (objArray.length === 0) return;
     const proxy = this.getProxyLayer()
      cb(proxy);
     return objArray.reduce((bottomObj, topObj) => {
        proxy.composition.forEach(layerMethod => {
          const newBottomObj = layerMethod(bottomObj, topObj).bottomObj;
          return newBottomObj;
         });
     }, new Layer(this.bottomObj))
    }
 }


/**
 * @callback PrepareCallback
 * @param {object} bottomObj
 * @param {object} resultObj will be {} if called for the first time
 * @returns {Array<object, object>} array of: [bottomObj, resultObj]. Orders matter 
 * @description Returned bottomObj will replace previous bottomObj and if you add properties to resultObj these properties are guaranteed to be returned in next method (if it is not prepare method again)
 */