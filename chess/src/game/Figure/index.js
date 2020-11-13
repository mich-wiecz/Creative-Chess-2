import React from 'react';
import * as Figures from 'assets/figures';

export default function Figure({
    imageName,
    color
}) {
    const FigureSvg = Figures[imageName];
    return (
        <FigureSvg 
        style={{
            fill: color
        }}
        />
    )
}
