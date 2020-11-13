import generatePossibleMoves from './generatePossibleMoves';
import {  getGameDataFromTemplate } from './getGameDataFromTemplate';


export function prepareStateBeforeGame(newState, templateName, templateReadConfig = {}) {

    const {templates, board, history} = newState;
    if (!templates.hasOwnProperty(templateName))
    throw new Error(`No template of name: ${templateName}`);

    const templateData = templates[templateName];
    const {configuration: tempConfig, template} = templateData;
        
    Object.assign(newState, getGameDataFromTemplate(newState, template, templateReadConfig));
    newState.activeGameTemplate = templateName;

        const rotation = tempConfig.hasOwnProperty('rotation') ? tempConfig.rotation : 0;
        board.rotation = rotation;    

        const { game } = newState;

        const teamsNames = game.teams.map(({name}) => {
            return name;
        });
        const statistics = teamsNames.reduce((result, teamName) => {
            result[teamName] = {
                time: null,
                wasPreviousMoveEndangeringKing: false
            };
            return result;
        }, {});


        game.statistics = {...game.statistics, ...statistics};
        history.game.history.push(game);
        history.game.initial = game;


        generatePossibleMoves(newState);
}
