import {createNextState as produce} from'@reduxjs/toolkit';
import {dataStore} from '@chess/store';
/* 
The list of remaining functions:

- undoMove
- redoMove
- undoPlaygroundBoardAction
- redoPlaygroundBoardAction
- readTemplateFromBoardMap (check if is checkmate at the beginning)
- createBoardMap
- getBoardExtremes
- manipulateBoardMap (but it will be just layer function that could take a callback and also an option to provide extremes)
- updatePlaygroundState - I think that maybe playground will be separate thing from game and it will have only boardMap, abstractBoard and extremes and when in playground it will take this data from game at first and then board will take the data from playground only - so also no moves - and this update Playground will take this things and add also to history
- return from playground: will remove all Playground history and also all Playground, and if a change was done it will readTemplateFromBoardMap and redo everything - here it will also remove all game history and back to game
- addTime

I think thats it for now 
It will be quite challenging - definitely
But also quite easy - the hardest things are done

*/


export function undoMove (state) {

    const nextState = produce(state, newState => {
        const {history, position} = newState.history.game;
        if (position === 0) return;
    
        const prevPosition = position - 1;
        newState.game = {...history[prevPosition]};
    })

    state = nextState;
}

export function redoMove (state) {
    const nextState = produce(state, newState => {
    const {history, position} = newState.history.game;
    if (position === history.length - 1) return;

    newState.game = {...history[position + 1]};

    })
    state = nextState;
}


export function undoPlaygroundBoardAction (state) {

    const nextState = produce(state, newState => {

    const {history, position} = newState.history.playground;
    if (position === 0) return;

    const prevPosition = position - 1;
    let abstractBoard;
    const {abstractBoard: prevAbstractBoardOrIndex} = history[prevPosition];
    if(typeof prevAbstractBoardOrIndex === 'object') {
        abstractBoard = prevAbstractBoardOrIndex;
    } else {
        const positionOfLastAbstractBoard = prevAbstractBoardOrIndex;
        abstractBoard = {...history[positionOfLastAbstractBoard].abstractBoard};
    }

    newState.playground = Object.assign(history[prevPosition], abstractBoard);

    })
state = nextState;

}

function redoPlaygroundBoardAction (state) {

    const nextState = produce(state, newState => {
    const {history, position} = newState.history.playground;
    if (position === history.length - 1) return;

    const nextPosition = position + 1;
    let abstractBoard;
    const {abstractBoard: nextAbstractBoardOrIndex} = history[nextPosition];
    if(typeof nextAbstractBoardOrIndex === 'object') {
        abstractBoard = nextAbstractBoardOrIndex;
    } else {
        abstractBoard = newState.playground.abstractBoard;
    }

    newState.playground = Object.assign(history[nextPosition], abstractBoard);

    })
    state = nextState;
}


function readTemplateFromPlaygroundTemplate (boardMap) {
    // I want it to be the same function as readTemplate but I will intercept assigning 
    /* 
    And here I will check if it is a string figure and if is I will return an array with extracted team, name and also I will take modification
    And then just normally
    The fastest way - so yeah
    */

    // Okay - done

}


function createPlaygroundMap (arguments) {
    /* 
    Hmm actually it could be createTemplateBoardMap
    And this will just expand template
    That way I do not need above function - because I will already have a template
    Or I will just do createPlaygroundTemplate that will automatically expand it
    And I will still need interceptor because mostly figures will be just normal figures - so one could be array - and one string
    */
}


function getBoardExtremes (arguments) {
    // There will be just function that will be iterate over coords
    // And also boardExtremesUpdater that will be iteratee that will take an result object, initialize it and update on every iteration when I want - easy

}


function manipulateBoardMap (boardMap, iteratee) {
    // Yes, I get that I could do something more so actually I will just use what I have - thats a good thing
  for(let coord in boardMap) {
      iteratee(boardMap, coord)
  }
  
}


function initializePlayground (arguments) {
    // it should take the boardMap and extremes and assign it to playground boardTemplate and extremes and also assign a abstractBoard to null
    // And it should be something like mode and this to playground


}

function updatePlayground () {
    /* 
    Will take next boardTemplate and extremes and abstract board and if no abstract board it will take the last of index of it from history
    */
}


function addTime () {
    // Easy - just add it to state
    // And also add gameType to time to show this timer and I will update its value when move
}


function generateBoardFields (obj) {
    const  {from, to, fill} = obj;
    // abstraction over getExpandedTemplate that 
}


/* 
Chess.playgroundAction(state, (playgroundData, extremesInterceptor))

*/
