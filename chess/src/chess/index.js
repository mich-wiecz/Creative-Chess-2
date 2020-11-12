import { classicNames, capablancaNames } from '@figures/names';
import { classicFiguresValues, capablancaFiguresValues } from '@figures/values';
import { classicFiguresMoves, capablancaFiguresMoves } from '@figures/movesSchemas';
import { createModelFigure } from '@figures/figures-creations/create-functions/modelFigures';
import {createNextState as produce} from '@reduxjs/toolkit';
import { dataStore} from '@chess/store.js';
import {createBoardTemplate} from '@chess/templates/createBoardTemplate';
import {readTemplateMap} from '@chess/readTemplateMap';

    const nextState = produce(dataStore, newState => {


        Object.values(classicNames).forEach(name => {
            const figData = {
                category: 'classic',
                name,
                value: classicFiguresValues[name],
                movesSchema: classicFiguresMoves[name],
            }
            createModelFigure(newState, figData);
        
        });
        
        Object.values(capablancaNames).forEach(name => {
            const figData ={
                category: 'capablanca',
                name,
                value: capablancaFiguresValues[name],
                movesSchema: capablancaFiguresMoves[name],
            }
            createModelFigure(newState, figData);
        });


    })

    dataStore = nextState;




    

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
      });

    


      readTemplateMap('classic');