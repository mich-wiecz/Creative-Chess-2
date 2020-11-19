import React, {memo} from 'react';
import Figure from './Figure';

export default memo(function BoardField({
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
        capture: {boxShadow: 'inset 0 0 2px 5px red'},
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
        onClick={onFieldClick ?  (() => onFieldClick(position, figure)) : undefined}
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
}, (prevProps, nextProps) => {
    return prevProps.temporaryState === nextProps.temporaryState && prevProps.figureData === nextProps.figureData;
})
