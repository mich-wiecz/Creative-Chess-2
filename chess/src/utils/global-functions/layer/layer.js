import merge from './functions/merge';
import getIntersected from './functions/getIntersected';
import getNonIntersected from './functions/getNonIntersected';
import * as layerDocs from './layer-docs';

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
   * @type {LayerDocs.DefaultLayerMethod}
   */
    _defaultLayerMethod(topObj, func) {
     if(!isValidObj(topObj)) 
     throw new Error(`Passed item should be object which is not an array nor function. Received: ${topObj}`)
     const result = func();
     return (new Layer(result)); 
    }
     /**
      * @type {LayerDocs.Merge}
      */
     merge(topObj, cb) {
      return this._defaultLayerMethod(topObj, () => merge(this.bottomObj, topObj, cb, this._resultObj))
     };
     
     /**
      * @type {LayerDocs.GetIntersected}
      */
     getIntersected(topObj, cb) {
      return  this._defaultLayerMethod(topObj, () => getIntersected(this.bottomObj, topObj, cb, this._resultObj))
     }h

     /**
     * @type {LayerDocs.GetNonIntersected}
     */
     getNonIntersected(topObj, cb) {
       return this._defaultLayerMethod(topObj, () => getNonIntersected(this.bottomObj, topObj, cb, this._resultObj))
     }

     
       /**
     * @type {LayerDocs.Prepare}
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
     * @type {LayerDocs.LayerEachByPattern}
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