

export function getMovements(step) {
    const colMove = step.hasOwnProperty('col') ? step.col : 0;
    const rowMove = step.hasOwnProperty('row') ? step.row : 0;
    return [colMove, rowMove];
}
