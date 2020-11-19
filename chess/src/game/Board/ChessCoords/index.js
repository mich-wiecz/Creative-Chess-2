import React from 'react';
import range from '@global-functions/range';
import {transformColToLetter} from 'chess/coords'



 function Vertical({className, boardExtremes: {top, bottom}}) {


    return (
        <div className={className}>
           {
           range(0, Math.abs(bottom) + top + 1)
           .map((_, index, arr) => (
                 <span 
                 key={index}
                 >
                {arr.length - index}
                 </span>
                
                ))
            }
        </div>
    )
}


function Horizontal({className, boardExtremes: {left, right}}) {
    return (
        <div className={className}>
           {
           range(0, Math.abs(left) + right + 1)
           .map((_, index) => (
                 <span 
                 key={index}
                 >
                {transformColToLetter(index + 1)}
                 </span>
                
                ))
            }
        </div>
    )
}

const ChessCoords = {
    Vertical,
    Horizontal
}
export default ChessCoords;
