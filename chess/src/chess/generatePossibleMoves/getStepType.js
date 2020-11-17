import { isStringFigure, extractTeam } from '@chess/figures/functions';




function GetStepTypeTemplate(coord, boardMap, middle) {
    if (!boardMap.hasOwnProperty(coord)) return;
    const field = boardMap[coord];
    const result =  middle(field);
    if (result) return result;
    return 'block';
}



 export function getStepTypeForAll(coord, boardMap, figTeam) {

  return  GetStepTypeTemplate(coord, boardMap, field => {
        if (field === 'blanc')
        return 'walk';
    if (isStringFigure(field)) {
        if (extractTeam(field) !== figTeam)
            return 'capture';
        return 'block';
    }
    })
}


function getStepTypeForWalks(coord, boardMap) {
    return GetStepTypeTemplate(coord, boardMap, field => {
        if (field === 'blanc') return 'walk';
        return 'block';
    })
}


 function getStepTypeForCaptures(coord, boardMap, figTeam) {
    return GetStepTypeTemplate(coord, boardMap, field => {
        if (field === 'blanc')
        return 'potentialCapture';
    if (isStringFigure(field)) {
        if (extractTeam(field) !== figTeam)
            return 'capture';
        return 'block';
    }
    })
}



export function getProperGetStepType (type) {
    switch(type) {
        case 'walk': return getStepTypeForWalks;
        case 'capture': return getStepTypeForCaptures;
        default: return getStepTypeForAll;
    }
}