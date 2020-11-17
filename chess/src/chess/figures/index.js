import { classicNames, capablancaNames, names } from './names';
import values from './values';
import movesSchemas from './movesSchemas';
import { isCoord } from './functions';
import isColor from '../../isColor.js';

import dataStore from './dataStore';



// const defaultFigure = {
//     set: 'no-set',
//     deck: 'no-deck',
//     team: 'no-team',
//     name: names.queen,
//     color: 'white',
//     value: values.classicFiguresValues.queen,
//     movesSchema: movesSchemas.classicFiguresMoves.queen
// }

// /**
//  * @private
//  * @function
//  * @param {FigData} figData
//  * @returns {object}  object with: 
//  *  * figure unique id
//  *  * basic figure data with default values if some not provided (queen data)
//  *  * basic figure data copy on occasion of wanting to come back to initial data
//  * @description it will create raw figure data object, then you need to add this to board by addToBoard function
//  */
// function constructFigure(figData) {

//     /**
//      * @type {FigData}
//      */
//     return {
//         ...defaultFigure,
//         imageName: figData.name,
//         ...figData
//     }

// }

// const figuresCreators = {},
// sets = {},
// decks = {},
// teams = {}



//     function createSet (nameOfSet, figuresDataArr, figuresDataObject ) {
//         if(sets.hasOwnProperty(nameOfSet)) throw new Error(`Provided ${nameOfSet} already exist. You cannot override set.`);
//         const set = sets[nameOfSet];

//         function checkFigName (name) {
//             if (!figuresDataObject.hasOwnProperty('name'))
//             throw new Error(`Property name have to be`);
//             if(figuresCreators.hasOwnProperty(name))
//             throw new Error(`All figures names should be unique across all sets. Name ${name} is a duplicate.`)
//         }

//         function addFigure (set, data) {
//             const figure = constructFigure({...data, set: nameOfSet});
//             set[data.name] = figure;
//             figuresCreators[data.name] = {
//                 methodName: "Create" + data.name,
//                 method: (figureData) => {
//                     return {
//                         static: figureData,
//                         initialStatic: JSON.parse(JSON.stringify(figureData)),
//                         id: (Date.now() * Math.random()).toString()
//                     }
//                 } 
//             }
//         }

       
//         if(figuresDataArr) {
//             figuresDataArr.reduce((set, dataObject) => {
//                 const {name} = dataObject;
//                 checkFigName(name);
//                 addFigure(set, dataObject)
//                  return set;
//              }, set)
//         }

//         if (figuresDataObject) {

//             Object.keys(figuresDataObject.name).forEach((name, index) => {
//                 const collectedData = {};
//                 for(let item in figuresDataObject) {
//                     collectedData[item] = figuresDataObject[item][index];
//                 }
//                 // @ts-ignore
//                 checkFigName(name);
//                 addFigure(set, collectedData);
//             })
            
//         }
//     } 


//     // function useSets () {

//     //   function setsManipulator (nameOfSet) {
//     //       if (!sets.hasOwnProperty(nameOfSet)) 
//     //     throw new Error(`Given set: ${nameOfSet} does not exist`);
          
      

//     //     return [setsManipulator, setGetter];
//     // }

//     function getFiguresFromSet (nameOfSet, cb) {
//         if (!sets.hasOwnProperty(nameOfSet)) 
//         throw new Error(`Given set: ${nameOfSet} does not exist`);

//         const set = sets[nameOfSet];

//         if (cb) {
//             const partial = cb(Object.keys(sets[nameOfSet]));
//             if (!Array.isArray(partial)) throw new Error(`You should return array with chosen figures names from given array with figures names. Received: ${partial}`);
//           return  partial.reduce((partialSet, figureName) => {
//               if (!set.hasOwnProperty(figureName)) 
//               throw new Error(`In returned array from callback was figure name : ${figureName} that do not exist in set ${nameOfSet}`)
//                 partialSet[figureName] = JSON.parse(JSON.stringify(set[figureName]));
//                 return partialSet;
//             }, {})
//         }

//         return JSON.parse(JSON.stringify(set));

//     }

//     function removeFiguresSet (nameOfSet) {
//         if (!sets.hasOwnProperty(nameOfSet)) 
//         throw new Error(`Given set: ${nameOfSet} does not exist`);

//         const set = sets[nameOfSet];

//         if (set.hasOwnProperty('isRemovable') && set.isRemovable === false ) throw new Error(`This set is not removable`)

//         delete set[nameOfSet];
//     }


//         function createDeck (nameOfDeck, figuresObject) {
//             if(decks.hasOwnProperty(nameOfDeck)) throw new Error(`Provided ${nameOfDeck} already exist. You cannot simply override deck.`);

//             const deck = decks[nameOfDeck] = {};

//             for(let figureName in figuresObject) {
//                 if (!figuresCreators.hasOwnProperty(figureName)
//                 ) throw new Error(` No such figure: ${figureName}. You should take figure from figuresSets`)
//                 const {methodName, method} = figuresCreators[figureName];

//                 deck[methodName] = () => method({...figuresObject[figureName], deck: nameOfDeck, team: this.team, color: this.color})

//             }
//         }


//         function createTeams (nameOfDeck, ...teams) {
//             if(!decks.hasOwnProperty(nameOfDeck)) throw new Error(`Provided ${nameOfDeck} does not exist`);


//            return teams.reduce((result, teamObj) => {
//             Object.setPrototypeOf(teamObj, decks[nameOfDeck])
//             result.push(teamObj)
//             return result;
//            }, [])
//         }

//         createSet('classic', null, {
//             name: Object.keys(names),
//             movesSchema: Object.keys(movesSchemas),
//             values: Object.keys(values)
//         });

//         createDeck('classic', getFiguresFromSet('classic'));

//       const [whites, blacks] =  createTeams('classic', {team: 'white', color: 'white'}, {team: 'black', color: 'black'})

//       console.log(whites.createPawn())

/**
 * Will assign string with figures team, name and id to boardMap. Extended figures data will be added to figuresLookupTable
 * @function
 * @param {object} figures data from constructFigure function
 * @param {object} boardMap actually used board map
 * @param {"force" | "only-when-free"} [option] if you add "force" as last argument, figure will replace an entity that is already in that coord. Otherwise will throw error in such situation. If you add "only-when-free" it will not throw error, just continue.
 */



const data = {
game: {
possibilitiesMapping: {},
teams: [''],
individualFigures: {
status: {
        active: [],
        captured: []
},
category: {
    classic: [],
    capablanca: [],
    noCategory: []
},
team: {
    blacks: [],
    whites: [],
    noTeam: []
},
name: {

}
}
},
modelFigures: {
    category: {
        classic: [],
        capablanca: [],
        noCategory: []
    }
}
}


/**
 * Okay, so I would do like that
 * Function createModelFigure that will have: {
 * category,
 * value,
 * movesSchema,
 * name,
 * imageName
 * } 
 * 
 * And this function will just add it to the database above
 * Important note is that these figure will be automatically category so this function if no category = noCategory, but if is so give the name of figure here
 * Check names for duplicates
 * And thats it
 * 
 * I would create a loop that will be looping through my objects and then I will create a function from it
 * 
 * Then I need to create a findor class and this findor class will have methods:
 * * findAllModelFigures() - means will get all,
 * * findModelFiguresBy(category, name) - will return these
 * * createTeams([teams objects], optional: found)
 * * createBlackAndWhiteTeams(optional: found)
 * 
 * So without found team will be just object with name and color and method create that will take a name of figure
 * Will have also addFounded
 * And if found are added - it will have methods create(Figure)(modification)
 * 
 * Teams will be stored as data also, findors not
 * Both teams and findor class will be available from method manipulating board - if exist
 * 
 * figFinder will not return its instance but the object with all figures and its names
 * 
 * And this methods - create - needs to take the name of figure and will take the figure data from database
 * Whats important this second argument will be add
 * 
 * I will also create a extended class of findor that will 
 * * findAllIndividualFigures()
 * * findIndividualFiguresBy(status, name)
 * 
 * 
 * 
 * I will store templates locally
 * And in place of figures there will be function that will refer to other function that will take modified data 
 * and create a new figure
 * Will take data from figure and
 * * add name: this will be a reference to modelFigures where basic data will be, I can overwrite this data and then data like value will be
 * * add personal and here will be:
 * *  id
 * * position and startPosition
 * * team and color
 * in this individual figure and I need a special function to take this data (used in findor for instance) that will firstly check in individual and if there is not it will take from model (like prototypes)
 * 
 * 
 * every findor will take the arrays
 * And each array will have a name (like category \ name) and equal value or a function 
 * And firstly it will look for such things in pointers but then go to figures itself - one by one and if not find just go to another
 * So looking for: name, category, team, status is okay
 * 
 * Will be
 * * findIndividualFigures(op: {movesSchema} => true)
 * * findIndividualFiguresById(id)
 * * findIndividualFiguresByTags([
 * ['category', 'classic'],
 * ['name', 'Pawn'],
 * [''],
 * ({value}) => true 
 * ])
 * 
 * getTags
 * findIndividualFiguresRandomly(optional: count - default to 5)
 * 
 * And I think more like individualFigures.findRandomly
 * 
 * 
 */




// console.log(manager.individualFigures.printTags())
// // console.log(manager.modelFigures.findByKeys(['Pawn', 'Queen']));
// console.log(white.createPawn({value: 9})('0|0'), dataStore.game.figures)















// Function should receive list of arrays with name of tag at first index (eg category). At second index should be wanted value (eg classic). Second value in the array could be also a callback that will be called for each value in tag ( tag eg category) ( value eg classic, capablanca). Callback will receive this value and if returns true function will return matched figure