import generatePossibleMoves from './generatePossibleMoves';
import { createNextState as produce } from '@reduxjs/toolkit';
import { getDataFromTemplate } from './getDataFromTemplate';


export function prepareStateBeforeGame(newState, templateName, config = {}) {

    const {configuration: tempConfig} = newState.templates[templateName]
    const rotation = tempConfig.hasOwnProperty('rotation') ? tempConfig.rotation : 0;
    newState.board.rotation = rotation;         
        

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


        game.statistics = statistics;
        newState.history.game.history.push(game);
        newState.history.game.initial = game;

}
