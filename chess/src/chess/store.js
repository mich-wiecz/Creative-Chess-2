export const dataStore = {
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
    defaultGame: {
        winner: 'team1',
        teams: {},
        statistics: {
            white: {
                time: 90,
                wasPreviousMoveEndangeringKing: false
            }
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
                        // movesPossibilities: {
                        //     moves: {
                        //         walks: [],
                        //         captures: [],
                                    // blocks: [],
                        //     },
                        //     
                        //     memoizedMovesSchema: []
                        // },

            //     },
            //     model: {
            //         wasOverridden: false
            //     }
            // }
        }
    },
    history: {
        defaultGame: {
            playgroundHistory: {},
            gameHistory: {
                limit: 10,
                position: 0,
                history: [
                    {
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
                    figures: {}
                    }
                ]
            },
        }
    }
}

export const templates = {};
