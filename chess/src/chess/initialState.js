
import { classicNames, capablancaNames } from '@figures/names';
import { classicFiguresValues, capablancaFiguresValues } from '@figures/values';
import { classicFiguresMoves, capablancaFiguresMoves } from '@figures/movesSchemas';
import {createModelFigure} from 'chess/figures/figures-creations/create-functions/modelFigures';
import { addTemplate} from 'chess/templates';
import * as defaultGameTemplates from 'chess/templates/defaultTemplates';
import {} from 'chess/templates/defaultTemplates'



  const initialState = {
    mode: 'playground',
    activeGameTemplate: 'classic',
    templates: {},
    boardFeatures: {
        rotation: 0,
        frozenFieldSize: null,
        boardMotive: {first: 'gray', second: 'green'}
    },
    modelFigures: {
        tags: {
            category: {
                classic: [],
                capablanca: []
            }
        },
        figures: {
            // WeirdName: {
            //     figure: {

            //     }
            // }gg
        }
    },
    playgroundInitialization: {
        extraSpaces: {right: 2, left: 2}
    },
    playground: {
      abstractBoard: null,
      playgroundBoardMap: {},
      boardExtremes: {}   
    },
    game: {
        statistics: {
            turn: 0,
            moveFor: null,
            movesDone: 0,
            // white: {
            //     wasPreviousMoveEndangeringKing: false
            // }
          
        },
        time: {
            isTimeGame: false,
            timeStarted: false,
              // white:  90,
        },
        protectKings: true,
        winner: null,
        reasonForWinning: null,
        teams: [],
        boardExtremes: {},
        boardMap: {},
        possibleMovesMapping: {},
        tags: {
            status: {
                active: [],
                captured: []
            },
                category: {},
                team: {
                noTeam: []
            },
                name: {}
        },
        figures: {
            // id: {
            //     figure: {
                        //     moves: {
                        //         walks: [],
                        //         captures: [],
                                    // blocks: [],
                        //     },
                        //     
                        //     memoizedMovesSchema: []

            //     },
            //     model: {
            //         wasOverridden: false
            //     }
            // }
        }
    },
    history: {
        game: {
            limit: 10,
            position: 0,
            initial: {},
            history: []
        },
        playground: {
            limit: 10,
            position: 0,
            initial: {},
            history: []
        }
    }
}


(function fillInitialState () {
       
        Object.values(classicNames).forEach(name => {
            const figData = {
                category: 'classic',
                name,
                value: classicFiguresValues[name],
                movesSchema: classicFiguresMoves[name],
            }
            createModelFigure(initialState, figData);
        });
        
        Object.values(capablancaNames).forEach(name => {
            const figData ={
                category: 'capablanca',
                name,
                value: capablancaFiguresValues[name],
                movesSchema: capablancaFiguresMoves[name],
            }
            createModelFigure(initialState, figData);
        });



            for(let templateData in defaultGameTemplates) {
                addTemplate(initialState.templates, templateData);
            }
    })()
            



export default initialState;