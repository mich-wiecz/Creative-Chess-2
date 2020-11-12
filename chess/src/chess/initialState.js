 export const initialState = {
    mode: 'playground',
    templates: {},
    board: {
        rotation: 0,
        frozenFieldSize: null,
        colorMotive: {first: 'gray', second: 'green'}
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
            turnFor: null,
            movesDone: 0,
            // white: {
            //     time: 90,
            //     wasPreviousMoveEndangeringKing: false
            // }
        },
        isTimeGame: false,
        timeStarted: false,
        protectKings: true,
        winner: null,
        teams: {},
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


export const dataStore = {...initialState};

