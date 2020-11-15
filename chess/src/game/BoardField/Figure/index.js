import React from 'react';
import * as Figures from 'assets/figures';

export default function Figure({
    imageName,
    color
}) {
    const FigureSvg = Figures[imageName];
    return (
      
        <FigureSvg 
        className="w-75 h-75"
        style={{
            fill: color
        }}
        />
    )
}
