 const initialState = {
    templates: {},
    board: {
        rotation: 0,
        rigidFieldSize: null,
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
            // }
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
        winner: 'team1',
        teams: {},
        statistics: {
            // white: {
            //     time: 90,
            //     wasPreviousMoveEndangeringKing: false
            // }
        },
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
        game: {},
        playground: {}
    }
}


export const dataStore = {...initialState};

