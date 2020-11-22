import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import range from '@global-functions/range';

export function generateDots(amount) {
    return (
<div className="position-relative"
style={{
    height: amount * 40,
    width: amount * 70
}}
>
{
 range(0, amount).map(dot => {
     dot = dot + 1;
    return (
        <React.Fragment key={dot}>
        {
           <>
           <span 
            className="d-block "
            style={{
                transformOrigin: 'center',
                position: 'absolute',
                top: `${dot / amount * 100}%`,
                left: `${ 50 * (dot / (amount) )}%`,
            }}
           >
                <FontAwesomeIcon 
                icon={faCircle}
                color="white"
                />
            </span>

            <span 
            className="d-block "
            style={{
                transformOrigin: 'center',
                position: 'absolute',
                top: `${dot / amount * 100}%`,
                left: `${100 - 50 * (dot / amount)}%`,
            }}
           >
                <FontAwesomeIcon 
                icon={faCircle}
                color="white"
                />
            </span>
           </>
           
        }
        </React.Fragment>

    )
})
}
 </div>
    )

   
 
}