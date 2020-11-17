import generatePossibleMoves from 'chess/generatePossibleMoves';
import {  getGameDataFromTemplate } from './getGameDataFromTemplate';


export function prepareStateBeforeGame(newState, templateName, templateReadConfig = {}) {


    const {templates, boardFeatures, history} = newState;
    if (!templates.hasOwnProperty(templateName))
    throw new Error(`No template of name: ${templateName}`);

    const templateData = templates[templateName];
    const {configuration: tempConfig, template} = templateData;

    const { game } = newState;
        
   newState.game =  Object.assign(game, getGameDataFromTemplate(newState, template, templateReadConfig));
    newState.activeGameTemplate = templateName;

    boardFeatures.rotation = 
    tempConfig.hasOwnProperty('rotation') 
    ? 
    tempConfig.rotation 
    : 
    boardFeatures.rotation;   


    const [statistics, castlingMonitoring] = game.teams.reduce((result, {name}, index) => {
        if(index === 0) {
            result[0].moveFor = name;
            result[0].turn = 1;
            result[0].movesDone = 0;
        }
        result[0][name] = {
            wasBadCastling: false,
            wasPreviousMoveEndangeringKing: false
        };
        result[1][name] = {
            isCastlingPossible: true,
            rooks: {}
        }
        return result;
    }, [{}, {}]);
        


        game.statistics = {...game.statistics, ...statistics};
        game.castlingMonitoring = castlingMonitoring;
        history.game.history.push(game);
        history.game.position++;
        history.game.initial = game;


        generatePossibleMoves(newState);
}
