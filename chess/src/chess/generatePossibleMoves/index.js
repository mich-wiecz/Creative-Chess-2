import { getFiguresIds } from './getFiguresIds';
import { getMovesSchema } from './getMovesSchema';
import { getPossibleMoves } from './getPossibleMoves';
import {splitCoord, makeCoord} from 'chess/coords';
import {getStepTypeForAll} from './getStepType';
import { extractId, isStringFigure } from 'chess/figures/functions';





export default function generatePossibleMoves (state, figuresIdsArray, noCastling) {


    const {possibleMovesMapping, figures: indFigures, castlingMonitoring, tags, boardMap} = state.game;
    figuresIdsArray = getFiguresIds(indFigures, figuresIdsArray);


    figuresIdsArray.forEach(figId => {

         const  movesSchema = getMovesSchema(state, indFigures[figId]),
        allPossibleMoves = getPossibleMoves(state, figId, movesSchema);


      indFigures[figId].figure = {
          ...indFigures[figId].figure,
              moves: allPossibleMoves,
              memoizedMovesSchema: movesSchema
      }

    })

  

  state.game.possibleMovesMapping = possibleMovesMapping;


  if (noCastling === 'no-castling') return;
 const {King: kingsIds, Rook: rooksIds} = tags.name;
  if(!kingsIds || !rooksIds) return;


  const qualifiedRooks = rooksIds.reduce((result, rookId) => {
    const rookData = indFigures[rookId].figure;
    const {team: rookTeam, madeMove} = rookData;
    if (!madeMove) {
      if (!result.hasOwnProperty(rookTeam)) {
      result[rookTeam] = [];
      }
      result[rookTeam].push(rookData);
    }
    return result;
  }, {});

    for(let kingId of kingsIds) {
    
    const {
      team: kingTeam, 
      position: kingPosition, 
      moves: kingMoves,
      madeMove: kingAlreadyMadeMove
    } = indFigures[kingId].figure,
    [kingCol, kingRow] = splitCoord(kingPosition);

    if (!qualifiedRooks.hasOwnProperty(kingTeam) || 
    kingAlreadyMadeMove ||
    !castlingMonitoring[kingTeam].isCastlingPossible
    )  {
      continue;
    }


      for(let {position: rookPosition, id: rookId} of qualifiedRooks[kingTeam]) {


      const [rookCol, rookRow] = splitCoord(rookPosition);
      if (kingRow !== rookRow) continue;

      const rookColMove = rookCol < kingCol ? 1 : -1;

      castlingMonitoring[kingTeam].rooks[rookId] = {
        kingNextPosition: makeCoord(kingCol - (2 * rookColMove), kingRow),
        figuresOnWay: [],
        row: rookRow,
        startCol: rookCol + rookColMove,
        endCol: kingCol - rookColMove
      }
      const monit = castlingMonitoring[kingTeam].rooks[rookId];
  

      let isFreeWay = true, stepCount = 1,   newCoord = makeCoord(rookCol + rookColMove * stepCount, rookRow);

      while (newCoord !== kingPosition) {
     
      stepCount++;
       if (getStepTypeForAll(newCoord, boardMap, kingTeam) !== 'walk') {
        if (isStringFigure(boardMap[newCoord]))  {
          monit.figuresOnWay.push(extractId(boardMap[newCoord]))
        }
           isFreeWay = false;
       }
       newCoord = makeCoord(rookCol + rookColMove * stepCount, rookRow);
      } 



            if(!isFreeWay) {
              continue;
            }

              if (!kingMoves.hasOwnProperty('castlings')) {
                kingMoves.castlings = [[]]
              }
                kingMoves['castlings'][0].push(monit.kingNextPosition);
                const mappedCastlingMove = possibleMovesMapping[monit.kingNextPosition];


                if (!mappedCastlingMove.hasOwnProperty('castlings')) {
                  mappedCastlingMove.castlings = [];
                  }


                mappedCastlingMove.castlings.push(kingId + '##' + 0)
              }
    


  }
    



}





