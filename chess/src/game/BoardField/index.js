import React from 'react';
import Figure from 'Game/Figure';

export default function BoardField({
    pawnStartRow,
    position,
    color,
    className = '',
    style = {},
    onFieldClick,
    figureData,
    temporaryState
}) {

    const {id, color: figColor, imageName} = figureData;


    const specialStyles = {
        walk: {boxShadow: 'inset 0 0 2px 5px gold'},
        capture: {boxShadow: 'inset 0 0 2px 5px gold'}
    }

    return (
        <div 
        className={`${className}`}
        style={{
            backgroundColor: color,
            ...specialStyles[temporaryState],
            ...style
        }}
        onClick={() => onFieldClick(position, id, pawnStartRow)}
        >
            {
                figureData &&
                <Figure 
                imageName={imageName}
                color={figColor}
                />
            }
        </div>
    )
}
