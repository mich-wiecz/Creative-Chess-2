import { templates, dataStore } from '../../store.js';
import {makeCoord, splitCoord, calculateCoordDifference} from '@chess/coord-functions';
import {isStringFigure, extractTeam} from 'chess/figures/functions';
import cloneDeep from 'lodash.clonedeep';


export function getStepType (coord, boardMap, figTeam) {
    if(!boardMap.hasOwnProperty(coord)) return;
    const field = boardMap[coord]
    if ( field === 'blanc') return 'walk';
    if(isStringFigure(field)) {
      if (extractTeam(field) === figTeam) return 'capture'
      return 'block';
    }
    return 'block';
}

export function couldMakeNextStep (recentStepType, amount) {
  if ( !recentStepType ||
  recentStepType === 'block' || 
  recentStepType === 'capture' ||
  amount < 1) return false;
  return true;
}

export function getExcludedStepType (stepsArray) {
  if (stepsArray.hasOwnProperty('type')) {
      if (stepsArray.type === 'walk') return 'capture';
      return 'walk';
  }
  return null;
}


export function getMovements(step) {
    const colMove = step.hasOwnProperty('col') ? step.col : 0;
    const rowMove = step.hasOwnProperty('row') ? step.row : 0;
    return [colMove, rowMove]
}



export function getPossibleMoves  (
    startPosition,
    figure,
    movesSchema, 
    startSequenceIndex, 
    boardMap, 
    possibleMovesMapping
    ) {

    const allMoves = {
        walks: [],
        captures: [],
        blocks: []
    }
    
    movesSchema.forEach(stepsObject => {
 
        let {steps, amount} = stepsObject;
        const excludedStepType = getExcludedStepType(stepsObject);

        const {id: figureId, team} = figure;

              steps.forEach(step => {
  
                
                const [figCol, figRow] = splitCoord(startPosition),
                   [colMove, rowMove] = getMovements(step);
    
                    let recentStepType;
    
                    const sequenceMoves = {
                        walks: [],
                        captures: [],
                        blocks: []
                    }
    
    
                  do {
                    const newCoord = makeCoord(figCol + colMove, figRow + rowMove);
                    recentStepType = getStepType(newCoord, boardMap, team);
                    if (!recentStepType || recentStepType === excludedStepType) continue;
                    const pluralStepType = recentStepType  + 's';
                        sequenceMoves[pluralStepType].push(newCoord);
                        possibleMovesMapping[newCoord][pluralStepType].push(figureId + '##' + startSequenceIndex);
                    amount--;
                  } while(couldMakeNextStep(recentStepType, amount))

                  
                  for(let moveType in allMoves) {
                      allMoves[moveType].push(sequenceMoves[moveType])
                  }

                  startSequenceIndex++;
                  
              })
      
            
          
    })

    return allMoves;

}



export default function generatePossibleMoves (figuresObject, boardMap, possibleMovesMapping) {
  for  (let figIndex in figuresObject) {

      let movesSchema; 
      const {figures: indFigures} = dataStore.defaultGame;
     const {name, position, startPosition} = indFigures[figIndex].figure;
     const {model} = indFigures[figIndex];
      if(model.hasOwnProperty('movesSchema')) {
          movesSchema = model.movesSchema;
      } else {
          movesSchema = dataStore.modelFigures.figures[name].figure.movesSchema;
      }

      if(typeof movesSchema === 'function') {
          movesSchema = movesSchema({
              position,
              startPosition
          })
      }

      movesSchema = cloneDeep(movesSchema);


        const allPossibleMoves = getPossibleMoves(
            position,
            indFigures[figIndex].figure,
            movesSchema, 
            0, 
            boardMap,
            possibleMovesMapping
            );
    


      indFigures[figIndex].figure = {
          ...indFigures[figIndex].figure,
          movesPossibilities: {
              moves: allPossibleMoves,
              memoizedMovesSchema: movesSchema
          }
      }

  } 

  dataStore.defaultGame.possibleMovesMapping = possibleMovesMapping;
}


/* 

no - walk and move as it was


[
    {type: ("move" | "capture"), amount, steps: [
        {col: 2, row: -1},
        {row: 3},
        {col: 5}
    ]},
    ...{...}
]


Aim:
1. Add possible moves to every figure (by find) as an array with arrays of every steps sequence (arrays with coords)
And also there will be division on moves, captures and blocks

2. At the same add index of figure to possibleStepsMapping to proper coord and also there will be the division of moves, captures and blocks
Also - not only index will be stored but also a number of sequence - this array (after ##)\

3. Add this movesSchema to figure to step object but instead of amount there will be amount remaining



Okay - here are problems:

1. Structure of figure steps object

steps: {
possible: {
    moves: [[], []],
    captures: [[], []]
} 
additional: {
    blocks: [],
    movesSchema: []
}
}


2. How I get the number of sequence?



Back to reading template

1. Try with this index until it will be done
2. Config should take only providedBoardExtremes with this option ensure
And if provided without ensure so just do it like now and just include them in result boardMap
If provided with ensure create a function assign that will assign coord to boardMap
And with provided - just this function
If not provided add updating board extremes
Or no - ensuring is too much


Then create a function create initial that will actually not save this but return the figure
And at the same time I will be creating a possibleStepsMapping and from the beggining every coord will have the same structure


And string coords will be in one map and figures in other
And at the end of creation I will take the figures to create possible moves function that will iterate over every figure index and stepsSchema and for will also take this full now possibleStepsMaping object and populate this and the figures data

At the end all will be added to proper parts - and that way I do not need to use immer - only when making a move


Important note is that undefined coord also needs to count as a block - because further expending the board




*/