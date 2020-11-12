export function endOfficialGame(gameData, winnerTeam = "no winner") {
    gameData.winner = winnerTeam;
    gameData.protectKings = false;
    gameData.isTimeGame = false;
}
