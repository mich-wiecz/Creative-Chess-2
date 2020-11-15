import { names } from '../../names';
import { classicFiguresValues } from '../../values';
import { classicFiguresMoves } from '../../movesSchemas';
import {functionalMovesSchemas} from 'chess/initialState';

import toUpperFirst from '@global-functions/toUpperFirst';


 function upsertTags (state, figureData, identification) {
    const {tags} = state.modelFigures;
    for(let TagName in tags) {
    let figTagValue = 
    figureData.hasOwnProperty(TagName) 
    ?
    figureData[TagName]
    :
    'no' + toUpperFirst(TagName);

    const tag = tags[TagName];
    
    if (!tag.hasOwnProperty(figTagValue)) (tag[figTagValue] = []);
    tag[figTagValue].push(identification);
    }
 
 }


/**
 * @typedef FigData
 * @property {string} name name of figure
 * @property {string} color displayed color of figure
 * @property {object} team  moves patterns for figure
 * @property {number} value value of figure
 * @property {string} [imageName] name of figure from which the image will be taken  
 * @property {string} [set] set from which figure was taken - default to: "no-set"
 * @property {string} [deck] deck from which figure was taken - default to: "no-deck"
 * @property {string} [team] team from which figure was taken - default to: "no-team"
 */


 /**
 * @typedef ModelFigData
 * @property {string} name name of figure
 * @property {number} value value of figure
 * @property {Array<object>|Function} movesSchema
 * @property {string} [imageName] name of figure from which the image will be taken  
 * @property {string} [category] category of figure, like classic or capablanca 
 */




const defaultModelFigure = {
    name: names.queen,
    value: classicFiguresValues.queen,
    movesSchema: classicFiguresMoves.queen,
    imageName: names.queen
}

/**
 * @private
 * @function
 * @param {ModelFigData} figData
 * @returns {object}  object with: 
 *  * figure unique id
 *  * basic figure data with default values if some not provided (queen data)
 *  * basic figure data copy on occasion of wanting to come back to initial data
 * @description it will create raw figure data object, then you need to add this to board by addToBoard function
 */
export function createModelFigure (state, figData) {

    const {name, movesSchema, ...rest} = figData;

    let schemaToState;
    if (typeof movesSchema === 'function') {
        functionalMovesSchemas[name] = movesSchema;
        schemaToState = name;
    } else {
        schemaToState = movesSchema;
    }

    figData = {
    ...defaultModelFigure,
    imageName: name,
    movesSchema: schemaToState,
    ...rest
    }
    state.modelFigures.figures[name] = {
        figure: figData
    }

    upsertTags(state, figData, name);
}




export  function createModelFigures (state, modelFigures) {
    for(let name in modelFigures) {
       createModelFigure(state, modelFigures[name]);
    }
    
   
 }