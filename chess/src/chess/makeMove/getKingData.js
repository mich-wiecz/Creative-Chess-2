export function getKingData(state, actualTeam) {
    const {game} = state;
    const kingIdsArray = state.game.tags.name.King;
    for (let kingId of kingIdsArray) {
        const { team: teamOfKing, position, id } = game.figures[kingId].figure;
        if (teamOfKing === actualTeam)
            return [position, id];
    }
}
