import {createTemplate} from '../index';
import range from 'utils/global-functions/range';
const meta = {
    longTitle: 'Capablanki (dwie dodatkowe figury)',
    description: ''
}

const gameConfiguration = {
    rotation: 0,
}

const buildConfiguration = {
    provideExtremes: {
        top: 7,
        right: 9,
        bottom: 0,
        left: 0
    }
}




export const capablancaGameTemplate = (state) => createTemplate(
    state,
    (FiguresManager, build) => {

        const allCapablancaFigures =  FiguresManager.modelFigures.findByTags([['category', (category) => {
            if (category === 'classic' || category === 'capablanca') return true;
        }]]);
        const teams = FiguresManager.createBlackAndWhiteTeams(allCapablancaFigures);
        const {white: {figuresSet: whiteSet}, black: {figuresSet: blackSet}} = teams;
      
      
        const positionFigures = (set) => {
          const {Rook, Bishop, Knight, Queen, King, Archbishop, Chancellor} = set;
          return [Rook(), Knight(), Archbishop(), Bishop(), Queen(), King(), Knight(), Chancellor(), Bishop(), Rook()];
        }
      
          return build([
              {
                  from: '0|0',
                  to: '9|7',
                  fill: 'blanc',
                  nest: [
                      {
                          from: '0|0',
                          colSpan: 10,
                          fill:  positionFigures(whiteSet)
                      },
                      {
                          from: '0|1',
                          colSpan: 10,
                          fill: range(0, 8).map(_ => whiteSet.Pawn())
                      },
                      {
                          from: '0|7',
                          colSpan: 10,
                          fill:  positionFigures(blackSet)
                      },
                      {
                          from: '0|6',
                          colSpan: 10,
                          fill: range(0, 8).map(_ => blackSet.Pawn())
                      },
      
                  ]
              }
          ], teams, buildConfiguration)
    }, 
   { 
    title: 'capablanca',
    configuration: gameConfiguration,
    meta
}
);