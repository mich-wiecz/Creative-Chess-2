// const {createIndividualFigure} = require('./create-functions/individualFigures');
import { dataStore } from 
'../../initialState';
import isColor from 'utils/global-functions/isColor';
import { nanoid } from 'nanoid';


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

    constructor(teamData, foundedModelFigures) {
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
        const {figures} = dataStore.modelFigures;
        if(!figures.hasOwnProperty(figureName)) throw new Error(`Invalid figure name. Not found in model figures. Received: ${figureName}`);

        const figureData = {...this._teamData, id: nanoid()}
        const basic = [figureName, figureData]
        return (modification ? basic.push(modification) : basic)
    }

    modify(figureNameOrArr, modification) {
        const figureName = this._getFigureName(figureNameOrArr);
        if(!this.figuresSet.hasOwnProperty(figureName)) throw new Error(`Invalid figure name. Not found in team figures set. Firstly you need to add this figure. Received: ${figureName}`);

       this.figuresSet[figureName] = this.figuresSet[figureName].slice(0, 2).push(modification);
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
                figObj[figName] = self.create(figName)
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