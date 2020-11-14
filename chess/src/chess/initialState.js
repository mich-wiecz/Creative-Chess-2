
import { classicNames, capablancaNames } from '@figures/names';
import { classicFiguresValues, capablancaFiguresValues } from '@figures/values';
import { classicFiguresMoves, capablancaFiguresMoves } from '@figures/movesSchemas';
import {createModelFigure} from 'chess/figures/figures-creations/create-functions/modelFigures';
import { addTemplate} from 'chess/templates';
import * as defaultGameTemplates from 'chess/templates/defaultTemplates';
import {} from 'chess/templates/defaultTemplates'

  


// Add castlingMonitoring obj with false to initial state
// Come back here and actually I want to do this check at the end - when all other moves are done
// So just then find kings and their rooks and fill the castlingMonitor or remain false
/* 
And if castling is possible already so I want to add it to castlings and to movesMapping


3. After king is safe I could check if castling possible, then if figure id is in one of the figures on the way (check all rooks) and if it is if the nest coord has changed the row or if not if its col is not in between start and end
And if it is not so pull out the figure id and check if entire array is not empty
If empty so take kingNextPosition and put is in kings castlings array or create one if does not exist
And also put the position in possibilities mapping

But there is also other possibility
That the figure will become the obstacle
Check for it and if it is - if other are so only add it to array
But if only it - so remove castling from king and movesMapping



4. updating King and rook
So if King is updating I need to set madeMove to true and return the castlingMonitoring to original object and if king has castling so remove them and also from movesMapping
if Rook is updating set also the madeMove and and remove this rook from castling (in both cases check if they have not made the move before) and if this kingNextPosition is in kings castling remove this and also remove this from mapping

5. Doing castling

- check if it is castling - a figure is king, castling is possible and this position is withing its castlings
So then I need to check if the two positions are not under attack
If are return everything
If are not - Then change the both position - also from rook - take it from the castlingMonitoring array 
Then update other figures - for both also

The default checking of king

Then if ok - update their both data - and of course because it will be move it will automatically delete all castlingMonitoring 


6. Catch it in Board - so additional set for castling and additional checking - and add an azure color
And thats it - actually pretty straightforward - but I need to stick to the plan
*/

















  const initialState = {
    mode: 'playground',
    activeGameTemplate: 'classic',
    templates: {},
    boardFeatures: {
        rotation: 0,
        frozenFieldSize: null,
        boardMotive: {first: 'gray', second: 'green'},
        interactionStyle: 'clicking',
        animationsOn: false,
        showPossibleMoves: true,
        musicOn: false
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