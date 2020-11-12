export function checkIsKingInDanger(kingPosition, possibleMovesMapping) {


    const { captures: kingCaptures } = possibleMovesMapping[kingPosition];
    if (kingCaptures.length > 0)
        return true;
    return false;
}
