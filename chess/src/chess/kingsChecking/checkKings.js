import { getKingData } from '../makeMove/getKingData';
import { checkIsKingInDanger } from './isKingInDanger';
import { getEnemyTeam } from '../makeMove/getEnemyTeam';
import {isCheckmate} from './isCheckmate';


export function checkKings(newState, team, movedFigName, movedFigNextPosition, capturedId) {
    let isKingInDanger, isCheckmateFact;

    const { game } = newState;
    const { teams: allTeams, possibleMovesMapping, figures } = game;
    const fellowKingPosition = movedFigName === "King" ? movedFigNextPosition :  getKingData(newState, team)[0];
    const enemyTeam = getEnemyTeam(team, allTeams);
    const [, enemyKingId] = getKingData(newState, enemyTeam);

    if (checkIsKingInDanger(fellowKingPosition, possibleMovesMapping, capturedId)) {
        isKingInDanger = true;
    } else {
        isKingInDanger = false;
    }


    if (isCheckmate(enemyKingId, figures, possibleMovesMapping)) {

        isCheckmateFact = true;
    } else {
        isCheckmateFact = false;
    }

    return [isKingInDanger, isCheckmateFact];

}
