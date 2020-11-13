import React from 'react';
import range from '@global-functions/range';
import { useSelector} from 'react-redux';
import {selectBoardExtremes} from 'redux/gameSlice';



 function Vertical({className}) {

    const {bottom, top} = useSelector(selectBoardExtremes);


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


function Horizontal({className}) {

    const {left, right} = useSelector(selectBoardExtremes); 
    return (
        <div className={className}>
           {
           range(0, Math.abs(left) + right + 1)
           .map((_, index) => (
                 <span 
                 key={index}
                 >
                {index + 1}
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
