import { splitCoord } from 'chess/coords';
import { defaultAdjustField } from './defaultAdjustField';
import { defaultBoardAssignment } from './defaultBoardAssignment';

export function getFunctionData(state, template, config = {}) {
    const { map, buildConfig } = template;
    const result = {};

    // const {otherFieldAdjustment, templateMap} = config;
    result.templateMapArray = config.hasOwnProperty('map') ? config.map : map;

    result.adjustField = 
    config.hasOwnProperty('adjustField') 
    ? 
    (...args) => config.adjustField(state, ...args) 
    : 
    (...args) => defaultAdjustField(state, ...args);


    result.possibleMovesMapping = {};

    if (buildConfig.hasOwnProperty('provideExtremes')) {
        result.extremes = buildConfig.provideExtremes;
        result.assignToBoardMap = defaultBoardAssignment;
    } else if (buildConfig.hasOwnProperty('withoutExtremes')) {
        result.extremes = {};
        result.assignToBoardMap = defaultBoardAssignment;
    } else {
        const extremes = {
            top: 0,
            right: 0,
            bottom: Infinity,
            left: Infinity,
        };
        result.assignToBoardMap = (possibleMovesMapping, boardMap, coord, value) => {
            const [col, row] = splitCoord(coord);
            const { top, right, bottom, left } = extremes;
            if (col > right) {
                extremes.right = col;
            }
            if (col < left) {
                extremes.left = col;
            }
            if (row > top) {
                extremes.top = row;
            }
            if (row < bottom) {
                extremes.bottom = row;
            }
            result.extremes = extremes;
            defaultBoardAssignment(possibleMovesMapping, boardMap, coord, value);
        };
    }

    return result;
}
