import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export default function ChoosableWrapper({
    isOn,
    children,
    chooseIconSize = "2x",
    ...props
}) {
    return (
        <div  
        className={` cursor-pointer p-1 d-inline-block ${isOn ? "bg-success" : ""}`}
        style={{position: 'relative'}}
     {...props}
     >
         {
             isOn &&
             <FontAwesomeIcon 
             icon={faCheckSquare} 
             className="text-success"
             size={chooseIconSize}
             style={{
                 position: 'absolute',
                 top: 0,
                 right: '0',
             }}
             />
         }
       
            {children}
        </div>
    )
}
