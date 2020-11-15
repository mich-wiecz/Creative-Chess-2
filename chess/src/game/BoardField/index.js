import React from 'react';
import Figure from './Figure';

export default function BoardField({
    position,
    color,
    className = '',
    style = {},
    onFieldClick,
    figureData: figure,
    temporaryState
}) {




    const specialStyles = {
        walk: {boxShadow: 'inset 0 0 2px 5px gold'},
        capture: {boxShadow: 'inset 0 0 2px 5px gold'},
        castling: {boxShadow: 'inset 0 0 2px 5px azure'}
    }

    return (
        <div 
        className={`${className} border border-dark d-flex flex-column justify-content-center align-items-center p-0 m-0`}
        style={{
            backgroundColor: color,
            ...specialStyles[temporaryState],
            ...style
        }}
        onClick={() => onFieldClick(position, figure)}
        >
            {
                figure &&
                <Figure 
                imageName={figure.imageName}
                color={figure.color}
                />
            }
        </div>
    )
}
