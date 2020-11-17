

const data = {
    possibleMovesMapping: {
        '0|0': {
            moves: ['13#0', '15#7'],
            capturings: [],
            block: []
        }
    },
    figures: {
        0: {
            static: {
                team: 'no-team',
                deck: 'no-deck',
                set: 'no-set',
                name: "Pawn",
                color: "ruby",
                value: 1,
                movesSchema: [{
                        type: 'walk',
                        steps: [{
                            col: 2,
                            row: 1
                        }, {
                            col: -1,
                            row: 3
                        }],
                        amount: Infinity
                    },
                    {
                        type: 'capture',
                        steps: [{
                            col: 2,
                            row: 1
                        }, {
                            col: -1,
                            row: 3
                        }],
                        amount: 2
                    },
                    {
                        steps: [{
                            col: 4,
                            row: 0
                        }, {
                            col: -1,
                            row: -1
                        }],
                        amount: 1
                    }
                ]
            },
            details: {
                position: '0|7',
                startPosition: '3|5',
                status: 'active'
            },
            possibleMoves: {
                possibilities: {
                    moves: [
                        ['0|3'],
                        ['2|4']
                    ],
                    capturings: [
                        ['1|3']
                    ]
                },
                blocks: ['2|3', '2|2'],
                movesSchemaWhenMove: [{
                        type: 'walk',
                        steps: [{
                            col: 2,
                            row: 1
                        }, {
                            col: -1,
                            row: 3
                        }],
                        amountRemaining: Infinity
                    },
                    {
                        type: 'capture',
                        steps: [{
                            col: 2,
                            row: 1
                        }, {
                            col: -1,
                            row: 3
                        }],
                        amountRemaining: 2
                    },
                    {
                        steps: [{
                            col: 4,
                            row: 0
                        }, {
                            col: -1,
                            row: -1
                        }],
                        amountRemaining: 1
                    }
                ]
            },
        }
    }
}

/**
 * * So I want to write down every possible situation that I need to refer to this table so that I know what I am doing
 * 
 * 1. Adding figures for the first time: when board is loaded
 * One thing is that there is only need for that when loading board, because before all relevant data is within figures
 * 
 * So initially - to boardTemplate I will store all figures data as object
 * And then when loading template I will replace this with strings and add data to store
 * 
 * Thing is to firstly add figures and then generating moves
 * 
 * Actually template could be store as just template with this '0|5->3|6' and then function to resolve this template will be
* And resolving will add data to store

So it will take the movesSchema, one steps object and it will populate 2 arrays: moves and capturings and maybe take the value of block
And put this to figures[id].possibleMoves and here to moves and capturings and also to block outside

But thats not the end
It needs to take every move and and put it to proper coord of move to the possibleMovesMapping and add it to proper property in such object (or create one if does not exist - everything could not exist): moves, capturings and blocks and thats arrays with figures index and sequence index 

    Also it needs to take actual moves schema and push to it array: to MovesSchemaWhenMoves with amountRemaining value (amount - index) or null if there is not amount remaining
* 

2. Updating after figure moves
    * remove figure from the old position = from boardMap and from its index = remove all moves, reset the movesSchemaWhenMove
    But not as fast
    When removing all moves I need to also get to the position in possibleMovesMapping and remove the figure index from there

    Then place the figure in new position in boardMap - just string and again generate moves the same way, adding movesSchemaWhenMove

    But I need to take the previous position and actual position and  find them in possibleMovesMapping (only in capturings or blocks), take the indexes here with the sequence index and update this figure moves based on this sequence and movesSchemaWhenMoves 

    Also this actual position is more complicated because of:
    - could interfere with moves as well
    - if I capture a position that was a block then it will be a capture but I will do it normal way for now - so just look also to moves

    And dont forget to update the position in details


    Changing the moves of figure in pending game
     So I think I could just add as last argument to createTemplate and also as a method an object with new moves and values that will take the names of actual figures and change what will match without creating a new set
    But this is not a really big deal


    The end game
    Firstly nothing - only when user restart or change something - reset all data store and load template again
    It could be usefull to save initial data but I will do it maybe later - this is detail


    The king checking
    So I need to take the position of actual turn king and check if this position is not in possibleMovesMapping in capturing
    If there is something I need to take the possibleMoves from king and check everything if there is a free way - no one has moves here - in mapping and check if these position are not moves or blocks for opposite team
    And if not so not check mate
    But if not I need to take this array (I should have) of kings capturers and if really more than one I need to take their possible moves of this sequence and check if they have some common steps
    If one just all sequence
    Now I need to check this coords in mapping and if I find that my figure has move here there will be also not checkmate

    But if not - there is a checkmate and end of the game
   

    Then if not - I after move of figure I need to remove its position and moves but also save this moves
    Then check this position (before generating moves) - so check if opposite team has capturings here - if it has - also generate moves for this - for as many this figure as they could capture king - if such - return to the beginning - so I need somehow remove this additional moves of enemies and take the figure to old position and restore its old possibleMoves object 
    And thats it

    Then another turn and the same thing


    -----
    What about playground
    I should protect figures against removal
    But also remove the history of game if something on board will change
    But this is not all playground
    SO I would say I would to switch at the top that will block methods that directly modifying game

    ---
    Inserting figures to pending game
    This is kinda hard because I need to also check king
    So I would say - no such possibility right now because I would rather use time-travel here

    --
    When time - I need to firstly do all logic and then restart timer

    ---
    how to create a template
    So I think basically I will just call a function createBoardTemplate and I will pass a callback with basic teams and 
    do this
    And this template will not be further done in some way

    Only when function readBoardTemplate

    I will also have 
    useSets, useDecks and useTeams 
    and in [] I will have getter and setter so I could manipulate it by functions


    Now lets talks about board template
    Easy
    return {
    "0|0->7|5": "blanc" | {
        default: "blanc",
        "0|5": "ghost"
    },
    Or 
    [
        {from: '0|0', to: '7|7'} // this will create normal board
        {from: '0|0', to: '7|7', default: "blanc"} // the same
        {
            from: '0|0', 
            to: '7|7', 
            default: "blanc", 
            map: {
            '4|5': "ghost"
        }} // the same

    ]

    Or maybe just
    [
        {from, to, field}
        {...coords}
        {from, to, field}
    ]

    And just like that
    }



    ------
    How I will structure my work
    I know what I should do
    The most important thing is to make sure that everything works at every steps

    So I will come back to layer and finish its testing
    Add functions from yesterday in different file and finish figures and test if sets, decks and teams are fine
    (with its interface as hooks)

    Create template and test
    Add function readTemplate but not as simple because this needs to save moves
    So save moves - step by steps - reading this plans
    And test this carefully

    Then create function to make moves and do everything and test
    Then add function to king checks and also test carefully

    Then create a function to create template but without support for figures
    Also to manipulate board but without manipulating figures

    Then only castling, pawn transformation  and history will remain me

    


* 
 */
