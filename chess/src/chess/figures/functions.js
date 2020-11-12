


export function updateFigureData (figure, property, newValue, tags) {
    if (!figure.hasOwnProperty(property)) throw new Error(`Property: ${property} does not exist on provided figure`);
    const oldValue = figure[property];
    figure[property] = newValue;

    if (!tags.hasOwnProperty(property) || oldValue === newValue) return;

    const {id} = figure;
    const tag = tags[property];
    tag[oldValue] =  tag[oldValue].filter(figId => figId !== id);
    tag[newValue] = [...tag[newValue], id];

}


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

export function extractId (figString) {
    return figString.split('##')[2];
}

export function isStringFigure (string) {
  if(string.length > 14) return true;
  return false;
}