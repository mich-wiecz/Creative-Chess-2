import {createSlice} from '@reduxjs/toolkit';
import {initialState} from '@chess/initialState';
import {readTemplate, createTemplate} from '@chess/templates';
import {createModelFigures} from '@figures/figures-creations/create-functions/modelFigures';
import makeMove from '@chess/makeMove';
import {endOfficialGame} from '@chess/endOfficialGame';
import {travelInTime, resetToDefault, resetToInitial} from '@chess/timeTravel'


const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        fieldSizeFrozen(state, action) {
            state.board.frozenFieldSize = action.newFieldSize;
        },  
        rotationChanged(state, action) {
            state.board.rotation = action.newRotation
        },
        boardMotiveChanged(state, action) {
            state.board.colorMotive = action.newMotive;
        },
        modelFiguresAdded(state, action) {
            createModelFigures(state, action.modelFigures);
        },
        templateAdded(state, action) {
            createTemplate(state, action.tempCreationData);
        },
        gameActivated(state) {
            state.mode = 'game';
        },
        playgroundActivated(state) {
            state.mode = 'playground'
        },
        templateChanged(state, action) {
            if( !state.templates) return;
            readTemplate(state, action.templateName);

        },
        moveMade(state, action) {
            makeMove(state, action.moveData);
        },
        timeAdded(state, action) {
            const {teamsStatistics} = state.game,
            {time: timeObject} = action;
          for(let team in timeObject) {
            teamsStatistics[team].time = timeObject[team]; 
          }
          state.game.isTimeGame = true;
          const {initial} = state.history.game;
          initial.isTimeGame = true;
          initial.teamData = teamsStatistics;
        },
        timeStarted(state) {
            state.game.timeStarted = true;
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
        officialGameEnded(state, action) {
            endOfficialGame(state.game, action.winner)
        },
        gameResetedToDefault(state) {
          resetToDefault(state);
        }
    }
});


// There are gew categories: history, time, board-appearance and game mechanics and I could split it to different reducers



export const {modelFiguresAdded, templateAdded, gamePrepared} = gameSlice.actions;

export default gameSlice.reducer;