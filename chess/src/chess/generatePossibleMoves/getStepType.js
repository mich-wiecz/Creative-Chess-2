import { isStringFigure, extractTeam } from '@chess/figures/functions';



export function getStepType(coord, boardMap, figTeam) {
    if (!boardMap.hasOwnProperty(coord))
        return;
    const field = boardMap[coord];
    if (field === 'blanc')
        return 'walk';
    if (isStringFigure(field)) {
        if (extractTeam(field) === figTeam)
            return 'capture';
        return 'block';
    }
    return 'block';
}
