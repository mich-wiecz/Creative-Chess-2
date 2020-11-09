import {createIndividualFigure} from '@figures/figures-creations/create-functions/individualFigures';
import {makeCoord, splitCoord, calculateCoordDifference} from '@chess/coord-functions';
import { templates, dataStore } from '../../store.js';
import createBoardTemplate from 'chess/board/functions/createBoardTemplate';




export default function readTemplateMap (templateName) {

    if(!templates.hasOwnProperty(templateName)) throw new Error(`No template of name: ${templateName}`)
    const {map: templateMapArray, buildConfig, teams} = templates[templateName].template;


    function defaultBoardAssignment (boardMap, coord, value) {
        boardMap[coord] = value;
    }


    let extremes, assignToBoardMap;
    if(buildConfig.hasOwnProperty('provideExtremes')) {
        extremes = buildConfig.provideExtremes;
        assignToBoardMap = defaultBoardAssignment;
    } else {
        extremes = {
            top: 0,
            right: 0,
            bottom: Infinity,
            left: Infinity,
        };
        assignToBoardMap = (boardMap, coord, value) => {
            const [col, row] = splitCoord(coord);
            const { top, right, bottom, left } = extremes;
            if (col > right) {
                extremes.right = col;
              }
              if (col < left) {
                extremes.left = col;
              }
              if (row > top) {
                extremes.top = row;
              }
              if (row < bottom) {
                extremes.bottom = row;
              }
              
              defaultBoardAssignment(boardMap, coord, value)
        }
    }



    function isPlainTemplateObject (tempObject) {
        if (tempObject.hasOwnProperty('from')) return false;
        return true;
    }
    
    
    function hasFigureData (item) {
        if (Array.isArray(item)) return true;
        return false;
    }
    
    function getFillProperty (tempObject) {
        if (tempObject.hasOwnProperty('fill')) {
           return tempObject.fill;
        } else {
            return 'blanc';
        }
    }
    
    function getToProperty (tempObject, splittedFromCoord) {
        const [fromCol, fromRow] = splittedFromCoord;
        if (tempObject.hasOwnProperty('to')) {
            return tempObject.to;
          } else if (tempObject.hasOwnProperty('colSpan')) {
            
              return makeCoord(fromCol + tempObject.colSpan, fromRow);
          } else throw new Error(`Cannot find a "to" or "colSpan" property in template map object: ${tempObject}. If there is a property "from" it needs to be also one of these two`);
    }
    
    function getTemplateRangeObjectData (tempObject) {
        const {from} = tempObject;
        const [fromCol, fromRow] = splitCoord(from);
        const to = getToProperty(tempObject, [fromCol, fromRow]);
        const [toCol, toRow] = splitCoord(to);
        const fill = getFillProperty(tempObject);
    
        const colDifference = Math.abs(toCol - fromCol),
        rowDifference = Math.abs(toRow - fromRow);
    
        let colSpan = Math.abs(colDifference),
        rowSpan = Math.abs(rowDifference);
    
        const colDirection = Math.sign(colDifference),
        rowDirection = Math.sign(rowDifference);
       
            return {
                from, 
                to, 
                fromCol,
                toCol,
                fromRow,
                toRow,
                fill,
                colSpan,
                rowSpan,
                colDirection,
                rowDirection
            }
    
    
    }
    
    function adjustField (coord, fieldValue) {
        if (hasFigureData(fieldValue)) {
            return createIndividualFigure(coord, ...fieldValue)
        } else {
            return fieldValue;
        }    
    }
    
    
    let figureIndex = 0;
    function adjustFillValue (fill) {
        if (!Array.isArray(fill)) {
            return (coord) => adjustField(coord, fill);
        }
    
        const length = fill.length;
        
        return function (coord) {
          const result =  adjustField(coord, fill[figureIndex]);
          if (figureIndex >= length - 1) {
              figureIndex = 0;
          } else {
            figureIndex++;
          }
    
          return result;
        }
    }
    
    
    
    function rangeTemplateObjectLoop (tempObject, cb) {
        const {
            fromCol,
            fromRow,
         fill,
         colSpan,
         rowSpan,
         colDirection,
         rowDirection
        } = getTemplateRangeObjectData(tempObject);
    
        const assignFill = adjustFillValue(fill);
    
        let rowIndex = -1;
        outer:
        while(++rowIndex <= rowSpan ) {
            let colIndex = -1;
            while(++colIndex <= colSpan) {
                const coord = makeCoord(
                    fromCol + (colIndex * colDirection), 
                    fromRow + (rowIndex * rowDirection)
                    );
                    
                   const response =  cb(coord, () => assignFill(coord));
                   if (response === 'break') break outer;  
        }}
    
        
    }
    
    
    function plainTemplateObjectLoop (tempObject, cb) {
        for(let coord in tempObject) {
        const response =  cb(coord);
        if (response === 'break') break;
        
        } 
    }
    
    
    function handleNestedRangeTemplateObject (coord, tempObject, resultBoardMap, assignOuterFill) {
    
    
        for(let nestedTempObject of tempObject.nest) {
            let breakMainLoop = false;
            if (breakMainLoop) break;
        if(isPlainTemplateObject(nestedTempObject)) {
            plainTemplateObjectLoop(
                nestedTempObject, 
                resultBoardMap, 
                (nestedCoord) => {
                    if(coord === nestedCoord) {
                        assignToBoardMap(resultBoardMap, coord, adjustField(coord, tempObject[coord]));
                        return 'break';
                    }
                    
                } )
        } else {
            rangeTemplateObjectLoop(nestedTempObject, (nestedCoord, assignNestedFill) => {
                if (nestedCoord === coord) {
                    assignToBoardMap(resultBoardMap, coord, assignNestedFill());
                    breakMainLoop = true;
                   return 'break';
                }
                
            }) 
        }
    
    }
    
        if (!resultBoardMap.hasOwnProperty(coord)) {
            assignToBoardMap(resultBoardMap, coord, assignOuterFill());
        }
    }
    
    
    function hasRangeTempObjectNestedTemplateMapArray (tempObject) {
        if (tempObject.hasOwnProperty('nest')) return true;
        return false;
    }




    const resultBoardMap = templateMapArray.reduce((boardMap, tempObject) => {
        if (isPlainTemplateObject(tempObject)) {
           plainTemplateObjectLoop(tempObject, (coord) => {
            assignToBoardMap(boardMap, coord, adjustField(coord, tempObject[coord]));
           });
        } else {
        rangeTemplateObjectLoop(tempObject, (coord, assignFill) => {
         if (hasRangeTempObjectNestedTemplateMapArray(tempObject)) {
        handleNestedRangeTemplateObject(coord, tempObject, boardMap, assignFill)
        } else {
            assignToBoardMap(boardMap, coord, assignFill());
         }
        })
        }
        return boardMap;
    }, {})

    let teamsObj;
        if (!teams) {
            teamsObj = {}
        } else {
            teamsObj = teams;
        }

    return {
        extremes,
        map: resultBoardMap,
        teams: teamsObj
    }
}

console.log(templates)
console.log(readTemplateMap('classic'))
console.log(dataStore.defaultGame)