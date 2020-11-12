import { dataStore } from '../../store.js';
import generatePossibleMoves from './generatePossibleMoves';
import { createNextState as produce } from '@reduxjs/toolkit';
import { getDataFromTemplate } from './getDataFromTemplate';


export function prepareStateBeforeGame(templateName, config = {}) {
    const nextState = produce(dataStore, newState => {
        // generatePossibleMoves(dataStore.game.figures, boardMap, possibleMovesMapping);

        // let id;
        // for(let figId in dataStore.game.figures) {
        //     id = figId;
        //     break;
        // }
        Object.assign(newState, getDataFromTemplate(newState, templateName, config));
        generatePossibleMoves(newState);


        const { game } = newState;

        const teamsNames = Object.keys(game.teams);
        const statistics = teamsNames.reduce((result, teamName) => {
            result[teamName] = {
                time: undefined,
                wasPreviousMoveEndangeringKing: false
            };
            return result;
        }, {});


        game.winner = null;
        game.statistics = statistics;

        const { gameHistory } = newState.history.game;
        newState.history.game.gameHistory = {
            ...gameHistory,
            history: [game],
            limit: 10,
            position: 0
        };

    });

    dataStore = nextState;
}
