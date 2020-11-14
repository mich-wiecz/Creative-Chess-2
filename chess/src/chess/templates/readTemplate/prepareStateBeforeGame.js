import generatePossibleMoves from './generatePossibleMoves';
import {  getGameDataFromTemplate } from './getGameDataFromTemplate';


export function prepareStateBeforeGame(newState, templateName, templateReadConfig = {}) {

    const {templates, boardFeatures, history} = newState;
    if (!templates.hasOwnProperty(templateName))
    throw new Error(`No template of name: ${templateName}`);

    const templateData = templates[templateName];
    const {configuration: tempConfig, template} = templateData;

    const { game } = newState;
        
    Object.assign(game, getGameDataFromTemplate(newState, template, templateReadConfig));
    newState.activeGameTemplate = templateName;

    boardFeatures.rotation = 
    tempConfig.hasOwnProperty('rotation') 
    ? 
    tempConfig.rotation 
    : 
    boardFeatures.rotation;   


    const [statistics, castlingMonitoring] = game.teams.reduce((result, {name}) => {
        result[0][name] = {
            time: null,
            wasPreviousMoveEndangeringKing: false
        };
        result[1][name] = {
            isCastlingPossible: true,
            rooks: {}
        }
        return result;
    }, [{}, {}]);
        
        // const statistics = 





        game.statistics = {...game.statistics, ...statistics};
        game.castlingMonitoring = castlingMonitoring;
        history.game.history.push(game);
        history.game.position++;
        history.game.initial = game;


        generatePossibleMoves(newState);
}
