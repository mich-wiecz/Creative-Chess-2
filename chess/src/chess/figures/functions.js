import { hasOwnProperty } from './names';

export function isCoord(coord) {
    if (typeof coord !== 'string') return false;
    const splitted = coord.split('|');
    return typeof Number(splitted[0]) === 'number' &&
        typeof Number(splitted[1]) === 'number';
}

export function makeCoord (col, row) {
    return (col + '|' + row).trim();
}

export function splitCoord (coord) {
    return coord.split('|').map(string => Number(string));
}

export function extractTeam (figString) {
    return figString.split(' ')[0];
}

export function extractFigName (figString) {
    return figString.split(' ')[1];
}

export function extractFigIndex (figString) {
    return figString.split(' ')[2];
}

export function isStringFigure (figString) {
    if (typeof figString !== 'string') return false;
    const splitted = figString.split(' ');
    if (figString.length !== 2) return false;

    const [team, name, index] = splitted;
    return hasOwnProperty(name) && typeof index === 'string';
}