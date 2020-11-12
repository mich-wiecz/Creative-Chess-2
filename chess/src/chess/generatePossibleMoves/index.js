import { getFiguresIds } from './getFiguresIds';
import { getMovesSchema } from './getMovesSchema';
import { getPossibleMoves } from './getPossibleMoves';


export default function generatePossibleMoves (state, figuresIdsArray) {


    const {possibleMovesMapping, figures: indFigures} = state.game;
    figuresIdsArray = getFiguresIds(indFigures, figuresIdsArray);


    figuresIdsArray.forEach(figId => {

         const  movesSchema = getMovesSchema(state, indFigures[figId].figure),
        allPossibleMoves = getPossibleMoves(state, figId, movesSchema);


      indFigures[figId].figure = {
          ...indFigures[figId].figure,
              moves: allPossibleMoves,
              memoizedMovesSchema: movesSchema
      }

    })
  

  state.game.possibleMovesMapping = possibleMovesMapping;
}
