import { FiguresDataManager } from '../../figures/figures-creations/dataManager';
import { templates, dataStore } from '../../store.js';

import { classicNames, capablancaNames } from '../../figures/names';
import { classicFiguresValues, capablancaFiguresValues } from '../../figures/values';
import { classicFiguresMoves, capablancaFiguresMoves } from '../../figures/movesSchemas';
import { createModelFigure } from '../../figures/figures-creations/create-functions/modelFigures';


Object.values(classicNames).forEach(name => {
    const figData = {
        category: 'classic',
        name,
        value: classicFiguresValues[name],
        movesSchema: classicFiguresMoves[name],
    }
    createModelFigure(figData);

});

Object.values(capablancaNames).forEach(name => {
    const figData ={
        category: 'capablanca',
        name,
        value: capablancaFiguresValues[name],
        movesSchema: capablancaFiguresMoves[name],
    }
    createModelFigure(figData);
});




function build (templateArray, teams, buildConfig ) {
    const teamsFigures = {};
    for(let team in teams) {
        teamsFigures[team] = teams[team].figuresSet;
    }
    
    return {
        map: templateArray,
        buildConfig,
        teams: teamsFigures
    }
}


export function createBoardTemplate (cb, {title, configuration, meta}) {
    const template =  cb(FiguresDataManager, build);
    if (!(title && typeof title === 'string')) throw new Error(`You have to specify a title for template in object as a second argument. Received: ${title}`)
    templates[title] = {
        template,
        configuration,
        meta
    } 
}



const meta = {
    longTitle: 'classic board',
    description: 'Just a classic board'
}

const gameConfiguration = {
    rotation: 0,
}

const buildConfiguration = {
    provideExtremes: {
        top: 7,
        right: 7,
        bottom: 0,
        left: 0
    }
}

createBoardTemplate((FiguresManager, build) => {

  const classicFigures =  FiguresManager.modelFigures.findByTags([['category', 'classic']]);
  const teams = FiguresManager.createBlackAndWhiteTeams(classicFigures);
  const {white: {figuresSet: whiteSet}, black: {figuresSet: blackSet}} = teams;


  const positionFigures = (set) => {
    const {Rook, Bishop, Knight, Queen, King} = set;
    return [Rook, Bishop, Knight, Queen, King, Knight, Bishop, Rook];
  }

    return build([
        {
            from: '0|0',
            to: '7|7',
            fill: 'blanc',
            nest: [
                {
                    from: '0|0',
                    colSpan: 8,
                    fill:  positionFigures(whiteSet)
                },
                {
                    from: '0|1',
                    colSpan: 8,
                    fill: [whiteSet.Pawn]
                },
                {
                    from: '0|7',
                    colSpan: 8,
                    fill:  positionFigures(blackSet)
                },
                {
                    from: '0|6',
                    colSpan: 8,
                    fill: [blackSet.Pawn]
                },

            ]
        }
    ], teams, buildConfiguration)
}, {
    title: 'classic',
    configuration: gameConfiguration,
    meta
})

console.log(dataStore, templates)

// So this function will actually just take a callback and pass a manager to this callback
// And should receive a object with template
/* 
Hard to validate this template because 

\But I know jh


So it will take the manager instance to callback as a first argument and second argument will be configuration and third argument will be meta data - like name, description 

Actually the fist callback will take manager and constructor - constructor will take as a parameter a callback with builder function and a second arg will take config to specifically board constructing like:
{
    provideExtremes: {top, left, bottom, right, shouldCutOverflow: false},
    mergeBoardPieces: false
}

builder will be a class with methods
.addGeneric({
from:
to:
fill: 'ghost'
nest: {
    '0|0': white.figuresSet.pawn 
}
})
.addFields({})

Or second option is just
[
{
from:
to:
fill: 'ghost'
nest: {
    '0|0': white.figuresSet.pawn 
},
{},
{}
]
f
I will rather do this second option
But last thing is: 
I want to do like this Object.values(white.figuresSet) so like pattern
fill: Object.values(white.figuresSet)

I will just do nest: {

}

I will just do spanCol and spanRow and this one that will be last will win
And if will be more than that it will repeat an array - but this is just a proto - does not matter

And I need to allow deep nesting - just need
Later I could build a San Fransisco here - not now
*/