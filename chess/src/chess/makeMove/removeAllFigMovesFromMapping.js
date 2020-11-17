

export function removeAllFigMovesFromMapping( figId, moves, possibleMovesMapping) {

    // for(let coord in possibleMovesMapping) {
    //     for(let moveType in possibleMovesMapping[coord]) {
    //         let ids = [];
    //         possibleMovesMapping[coord][moveType].forEach((mappingId, index) => {
    //             const figureId = mappingId.split('##')[0];
    //             if (figId === figureId) {
    //                 ids.push(mappingId);
    //                 // possibleMovesMapping[coord][moveType][index] = null;
    //             }
    //         })

    //         possibleMovesMapping[coord][moveType] =  possibleMovesMapping[coord][moveType].filter(mappingId => {
    //             return !ids.includes(mappingId);
    //         })
            
    //     }
        
    // }



    for (let moveType in moves) {
        moves[moveType].forEach((stepSequence, seqIndex) => {
            stepSequence.forEach((coord) => {
                const coordMapping = possibleMovesMapping[coord][moveType];
                const figMappingId = figId + '##' + seqIndex;
                possibleMovesMapping[coord][moveType] = coordMapping.filter(mapId => mapId !== figMappingId);
            });
        });
    }
}



