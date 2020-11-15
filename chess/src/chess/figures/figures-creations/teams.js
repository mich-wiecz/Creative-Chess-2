// const {createIndividualFigure} = require('./create-functions/individualFigures');

import isColor from 'utils/global-functions/isColor';
import { nanoid } from 'nanoid';
import {overriddenFunctionalMovesSchemas} from 'chess/initialState'


function validateTeamData (teamData) {
        if(
            typeof teamData !== 'object' ||
            !teamData.hasOwnProperty('name')
        ) throw new Error('teamData should be an object with property name');

        let color = teamData.hasOwnProperty('color') ? teamData.color : teamData.name;
        if(!isColor(color)) throw new Error(`Invalid color: ${color}. If you did not specified a color property on team object function has taken a color from name value.`);
}

export class Team {

    figuresSet = {};

    constructor(modelFigures, teamData, foundedModelFigures) {
        this.modelFigures = {...modelFigures};
      validateTeamData(teamData);
        this._teamData = teamData;
       this.addFigures(foundedModelFigures);
    }


    _getFigureName(item) {
        if(!item) throw new Error('You need to specify a figure name');
      return  Array.isArray(item) ? item[0] : item;
    }

    create(figureNameOrArr, modification) {
       const figureName = this._getFigureName(figureNameOrArr);
        if(!this.modelFigures.hasOwnProperty(figureName)) throw new Error(`Invalid figure name. Not found in model figures. Received: ${figureName}`);


        const figureId = nanoid();

        if (modification && modification.movesSchema && typeof modification.movesSchema === 'function') {
            overriddenFunctionalMovesSchemas[figureId] = modification.movesSchema.bind({});
            modification.movesSchema = figureId;
        }

        return  [figureName, {...this._teamData, id: figureId}, modification]
    }



    addFigures(foundedModelFigures) {

        const self = this;

        function getArrayOfFiguresNames (foundedModelFigures) {
         
            if (Array.isArray(foundedModelFigures)) return foundedModelFigures;
            if (typeof foundedModelFigures === 'object') return Object.keys(foundedModelFigures);
            throw new Error(`Provided argument should be an array of figures names or object with keys as figures names. Received: ${foundedModelFigures}`);
        }
       
     
         function getNewFiguresToSet (figuresArr) {
          return  figuresArr.reduce((figObj,  figName) => {
                figObj[figName] = (modification) =>  self.create(figName, modification)
                return figObj;
            }, {})
         }

         const  figuresArr = getArrayOfFiguresNames(foundedModelFigures);
         const newFigures = getNewFiguresToSet(figuresArr);
    
            this.figuresSet = {
                ...this.figuresSet,
                ...newFigures
            }
        
    }


}


