
import { classicNames, capablancaNames } from '@figures/names';
import { classicFiguresValues, capablancaFiguresValues } from '@figures/values';
import { classicFiguresMoves, capablancaFiguresMoves } from '@figures/movesSchemas';
import {createModelFigure} from 'chess/figures/figures-creations/create-functions/modelFigures';
import { addTemplate, readTemplate} from 'chess/templates';
import * as defaultGameTemplates from 'chess/templates/defaultTemplates';

export const functionalMovesSchemas = {};
export const overriddenFunctionalMovesSchemas = {};


export const defaultMotives = [
    {first: 'maroon', second: 'darkgoldenrod'}, 
    {first: 'transparent', second: 'darkorange'},
    {first: 'peru', second: 'royalblue'},
    {first: 'darkgreen', second: 'gray'},
    {first: 'slategrey', second: 'skyblue'}       
    ];



  const initialState = {
    mode: 'playground',
    activeGameTemplate: 'classic',
    templates: {},
    boardFeatures: {
        rotation: {
            fieldsRotation: 0,
            boardRotation: 0
        },
        frozenFieldSize: null,
        boardMotive: defaultMotives[0],
        interactionStyle: 'clicking',
        animationsOn: true,
        showPossibleMoves: true,
        musicOn: false
    },
    userBoardMotives: [],
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
            //     wasPreviousMoveEndangeringKing: false,
                // wasBadCastling: false
            // }
          
        },
        time: {
            isTimeGame: false,
            timeStarted: false,
              // white:  90,
        },
        protectKings: true,
        winData: {
            winner: null,
            reasonForWinning: null,
        },
        teams: [],
        boardExtremes: {},
        boardMap: {},
        castlingMonitoring: {
            /*
            white: {
                isCastlingPossible: true,
                rooks: {
                    [rookId] : {
                    kingNextPosition: 'coord', 
                    figuresOnWay: ['ids'], 
                    row: '0', 
                    startCol: 'coord', 
                    endCol: 'coord'
                }
                }
               
            }
            */
        },
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
            position: -1,
            initial: {},
            history: []
        },
        playground: {
            limit: 10,
            position: -1,
            initial: {},
            history: []
        }
    }
};


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



            for(let template in defaultGameTemplates) {
                const templateData = defaultGameTemplates[template](initialState);
                addTemplate(initialState.templates, templateData);
            }


            readTemplate(initialState, 'classic');
    })()
            



export default initialState;