import {createTemplate} from '../index';


const meta = {
    longTitle: 'classic chess game',
    description: ''
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




export const classicGameTemplate = createTemplate(
 (FiguresManager, build) => {

        const classicFigures =  FiguresManager.modelFigures.findByTags([['category', 'classic']]);
        const teams = FiguresManager.createBlackAndWhiteTeams(classicFigures);
        const {white: {figuresSet: whiteSet}, black: {figuresSet: blackSet}} = teams;
      
      
        const positionFigures = (set) => {
          const {Rook, Bishop, Knight, Queen, King} = set;
          return [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
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
    }, 
    {
    title: 'classic',
    configuration: gameConfiguration,
    meta
    }
);