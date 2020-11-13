export function endOfficialGame(gameData, { winner = "no winner", reason = 'none'}) {
    gameData.reasonForWinning = reason;
    gameData.winner = winner;
    gameData.protectKings = false;
    gameData.isTimeGame = false;
}
