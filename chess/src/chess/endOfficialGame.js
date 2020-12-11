export function endOfficialGame(gameData, { winner = "no winner", reason = 'none'}) {
    gameData.winData.reasonForWinning = reason;
    gameData.winData.winner = winner;
    gameData.protectKings = false;
    gameData.time.isTimeGame = false;
    gameData.time.timeStarted = false;
}
