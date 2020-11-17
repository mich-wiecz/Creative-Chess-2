export function checkIsKingInDanger(kingPosition, possibleMovesMapping, capturedId) {


    const { captures: kingCaptures } = possibleMovesMapping[kingPosition];
    if (kingCaptures.length > 0) {
        if (!capturedId) return true;
        const existingEnemyId =  kingCaptures.findIndex(mappingId => {
            const [figId] = mappingId.split('##');
            return figId !== capturedId;
        })
        if (existingEnemyId !== -1) return true
    }
    return false;
}
