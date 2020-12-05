import {createSlice} from '@reduxjs/toolkit';
import initialState from 'chess/initialState';
import {readTemplate, createTemplate, addTemplate} from 'chess/templates';
import {createModelFigures} from 'chess/figures/figures-creations/create-functions/modelFigures';
import makeMove from 'chess/makeMove';
import {endOfficialGame} from 'chess/endOfficialGame';
import {travelInTime, resetToInitial} from 'chess/timeTravel';
import {setTime, startTime, removeTime} from 'chess/time';


const gameSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        boardFeatureChanged(state, action) {
            const [feature, value] = action.payload;
            state.boardFeatures[feature] = value;
        },
        modelFiguresAdded(state, action) {
            createModelFigures(state, action.payload);
        },
        templateAdded: {
             reducer(state, action) {
                 console.log(action)
                addTemplate(state.templates, action.payload);
                readTemplate(state, action.payload.title);
             },
            prepare(state, buildCb, about) {
               return {
                   payload: createTemplate(state, buildCb, about)
               };
            }
        },
        templateChanged(state, action) {
            if( !state.templates) return;
            readTemplate(state, action.payload);

        },
        gameActivated(state) {
            state.mode = 'game';
        },
        playgroundActivated(state) {
            state.mode = 'playground'
        },
        moveMade(state, action) {
            makeMove(state, action.payload);
        },
        timeAdded(state, action) {
         setTime(state, action.payload)
        },
        timeRemoved(state) {
            removeTime(state);
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
        winCompleted(state) {
            state.game.winData.winDone = true;
        }
    }
});


export const selectBoardFeatures = state => state.chess.boardFeatures;
export const selectBoardMotive = state => state.chess.boardFeatures.boardMotive;
export const selectUserBoardMotives = state => state.chess.userBoardMotives;
export const selectAnimationsOn = state => state.chess.boardFeatures.animationsOn;
export const selectBoardRotation = state => state.chess.boardFeatures.rotation;
export const selectTime = state => state.chess.game.time;
export const selectModelFigures = state => state.chess.modelFigures.figures;
export const selectIndividualFigures = state => state.chess.game.figures;
export const selectStatistics = state => state.chess.game.statistics;
export const selectGameHistory = state =>  state.chess.history.game;
export const selectTemplates = state => state.chess.templates;
export const selectMode = state => state.chess.mode;
export const selectActiveGameTemplate = state => state.chess.activeGameTemplate;
export const selectBoardMap = state => state.chess.game.boardMap;
export const selectBoardExtremes = state => state.chess.game.boardExtremes;
export const selectWinData = state => state.chess.game.winData;
export const selectTeams = state => state.chess.game.teams;
export const selectWholeChessState = state => state.chess;



export const {modelFiguresAdded, templateAdded, gamePrepared, moveMade, moveRedone, moveUndone,  officialGameEnded, winCompleted, timeAdded, timeStarted, templateChanged, timeRemoved, gameResetedToDefault, gameResetedToInitial, playgroundActivated, boardFeatureChanged, gameActivated} = gameSlice.actions;

export default gameSlice.reducer;