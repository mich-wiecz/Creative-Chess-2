import { couldFellowFigureBlock } from "./couldFellowFigureBlock";
import { couldFellowFigureCaptureEnemy } from "./couldFellowFigureCaptureEnemy";
import { couldKingMakeSafeMove } from "./couldKingMakeSafeMove";
import { getSharedWalksOfManyEnemies } from "./getSharedWalksOfManyEnemies";


export function isCheckmate (kingId, figures, possibleMovesMapping) {

   

    const {position: kingPosition, team: kingTeam, moves: kingMoves} = figures[kingId].figure;
    const {captures} = possibleMovesMapping[kingPosition];
    const kingEnemiesCount = captures.length;
    if (kingEnemiesCount === 0) return false;
    if (kingEnemiesCount > 0) {

        const isOneEnemy = kingEnemiesCount === 1;

        const [enemyId, enemyMovesSequenceIndex] = captures[0].split('##');
        const {position: enemyPosition, moves: enemyMoves} = figures[enemyId].figure;
       
        if (isOneEnemy && couldFellowFigureCaptureEnemy(possibleMovesMapping[enemyPosition].captures)) return false;

        const coords = !isOneEnemy ? getSharedWalksOfManyEnemies(captures, figures) : enemyMoves.walks[enemyMovesSequenceIndex];
        if(coords.length !== 0 && couldFellowFigureBlock(coords, possibleMovesMapping, figures, kingTeam))  return false;


      if (couldKingMakeSafeMove(kingMoves, possibleMovesMapping, figures, kingTeam)) return false;

    }

    return true;

}