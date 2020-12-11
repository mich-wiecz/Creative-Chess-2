import generatePossibleMoves from 'chess/generatePossibleMoves';
import {  getGameDataFromTemplate } from './getGameDataFromTemplate';
export function prepareStateBeforeGame(newState, templateName, templateReadConfig = {}) {

    const {templates, boardFeatures, history} = newState;
    if (!templates.hasOwnProperty(templateName))
    throw new Error(`No template of name: ${templateName}`);

    const templateData = templates[templateName];
    const {configuration: tempConfig, template} = templateData;

    const { game } = newState;
        newState.game =  {
            statistics: {
                turn: 0,
                moveFor: null,
                movesDone: 0, 
            },
            time: {
                isTimeGame: false,
                timeStarted: false,
                initial: {}
            },
            protectKings: true,
            winData: {
                winner: null,
                reasonForWinning: null,
            },
            teams: [],
            boardExtremes: {},
            boardMap: {},
            castlingMonitoring: { },
            possibleMovesMapping: {},
            tags: {
                status: {
                    active: [],
                    captured: []
                },
                    category: {},
                    team: {
                    noTeam: []
                },
                    name: {}
            },
            figures: {}
        };

    
   newState.game =  Object.assign(
    newState.game, 
    getGameDataFromTemplate(newState, template, templateReadConfig)
    );


    newState.activeGameTemplate = templateName;
    boardFeatures.rotation = 
    tempConfig.hasOwnProperty('rotation') 
    ? 
    tempConfig.rotation 
    : 
    boardFeatures.rotation;   


    const [statistics, castlingMonitoring, time] = newState.game.teams.reduce((result, {name}, index) => {
        if(index === 0) {
            result[0].moveFor = name;
            result[2] = {
                prevTeam: name,
                initial: {}
            }
        }
        result[0][name] = {
            wasBadCastling: false,
            wasPreviousMoveEndangeringKing: false
        };
        result[1][name] = {
            isCastlingPossible: templateName === '960' ? false : true,
            rooks: {}
        };
        result[2][name] = null;
        result[2].initial[name] = null;
        return result;
    }, [{}, {}, {}]);
        


        newState.game.statistics = {...game.statistics, ...statistics};
        newState.game.castlingMonitoring = castlingMonitoring;
        newState.game.time = time;
        history.game.history = [newState.game]
        history.game.position = 0;
        history.game.initial = newState.game;


        generatePossibleMoves(newState);
}
