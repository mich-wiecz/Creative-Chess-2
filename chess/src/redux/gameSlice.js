import {createSlice} from '@reduxjs/toolkit';
import initialState from 'chess/initialState';
import {readTemplate, createTemplate, addTemplate} from 'chess/templates';
import {createModelFigures} from 'chess/figures/figures-creations/create-functions/modelFigures';
import makeMove from 'chess/makeMove';
import {endOfficialGame} from 'chess/endOfficialGame';
import {travelInTime, resetToInitial} from '@chess/timeTravel';
import {setTime, startTime} from 'chess/time'



const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        fieldSizeFrozen(state, action) {
            state.board.frozenFieldSize = action.newFieldSize;
        },  
        rotationChanged(state, action) {
            state.board.rotation = action.payload
        },
        boardMotiveChanged(state, action) {
            state.board.colorMotive = action.payload;
        },
        modelFiguresAdded(state, action) {
            createModelFigures(state, action.payload);
        },
        templateAdded: {
             reducer(state, action) {
                addTemplate(state.templates, action.payload);
             },
            prepare(buildCb, about) {
               return createTemplate(buildCb, about)
            }
        },
        gameActivated(state) {
            state.mode = 'game';
        },
        playgroundActivated(state) {
            state.mode = 'playground'
        },
        templateChanged(state, action) {
            if( !state.templates) return;
            readTemplate(state, action.payload);

        },
        moveMade(state, action) {
            makeMove(state, action.payload);
        },
        timeAdded(state, action) {
         setTime(state, action.payload)
        },
        timeStarted(state) {
           startTime(state)
        },
        moveUndone(state) {
            travelInTime(state, pos => pos - 1)
        },
        moveRedone(state) {
           travelInTime(state, pos => pos + 1);
        },
        gameResetedToInitial(state) {
           resetToInitial(state);
        },
        gameResetedToDefault() {
          return initialState;
        },
        officialGameEnded(state, action) {
            endOfficialGame(state.game, action.payload)
        },
    }
});


export const selectBoardFeatures = state => state.board;
export const selectTime = state => state.game.time;
export const selectModelFigures = state => state.modelFigures.figures;
export const selectIndividualFigures = state => state.game.figures;
export const selectStatistics = state => state.game.statistics;
export const selectGameHistory = state =>  state.history.game;
export const selectTemplates = state => state.templates;
export const selectMode = state => state.mode;
export const selectActiveGameTemplate = state => state.activeGameTemplate;
export const selectBoardMap = state => state.game.boardMap;
export const selectBoardExtremes = state => state.game.boardExtremes;
export const selectWinner = state => state.game.winner;
export const selectTeams = state => state.game.teams;





// There are gew categories: history, time, board-appearance and game mechanics and I could split it to different reducers



export const {modelFiguresAdded, templateAdded, gamePrepared, moveMade, moveRedone, moveUndone, boardMotiveChanged, officialGameEnded} = gameSlice.actions;

export default gameSlice.reducer;