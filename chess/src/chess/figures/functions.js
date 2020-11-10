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
    return figString.split('##')[0];
}

export function extractName (figString) {
    return figString.split('##')[1];
}

export function extractIndex (figString) {
    return figString.split('##')[2];
}

export function isStringFigure (string) {
  if(string.length > 14) return true;
  return false;
}