import React from 'react';
import {normalizeCoordForGrid, getFieldData} from './functions';
import BoardField from 'Game/BoardField';


 export default function ActualBoard ({
    boardMap, 
    boardExtremes, 
    figures, 
    modelFigures, 
    boardMotive,
    getTemporaryState,
    showPossibleMoves,
    fieldsRotation,
    isGameOn,
    isTimeGame,
    hasTimeStarted,
    handleClickOnField
   }) {

   let boardFields = [];
   for(let coord in boardMap) {
       const coordForGrid = normalizeCoordForGrid(coord, boardExtremes),
       field = boardMap[coord],
       fieldData = getFieldData(field, 
           coordForGrid, 
           figures, 
           modelFigures,
            boardMotive
           ),
        temporaryState = getTemporaryState(coord, showPossibleMoves);
 
       boardFields.push(
           <BoardField 
           key={coord}
           style={{
               transform: `rotate(${fieldsRotation ? fieldsRotation : 0}deg)`,
               gridColumn: `${coordForGrid[0]} / span 1`,
               gridRow: `${coordForGrid[1]} / span 1`,
           }}
           position={coord}
           {...fieldData}
           temporaryState={temporaryState}
           onFieldClick={
               (isGameOn && 
               (isTimeGame ? hasTimeStarted : true)
               ) 
               ? 
               handleClickOnField 
               : 
               undefined
           }
           />
       )

   }
   return boardFields;
   
}