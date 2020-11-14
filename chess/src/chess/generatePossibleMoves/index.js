import { getFiguresIds } from './getFiguresIds';
import { getMovesSchema } from './getMovesSchema';
import { getPossibleMoves } from './getPossibleMoves';
import {splitCoord, makeCoord} from 'chess/coords';
import {getStepType} from './getStepType';
import { extractId } from 'chess/figures/functions';


export default function generatePossibleMoves (state, figuresIdsArray) {


    const {possibleMovesMapping, figures: indFigures, castlingMonitoring, tags, boardMap} = state.game;
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


    /* 
    Check if castling possible
    I need to find kings
    And for both kings - fo a for each, take their names

    Also at the top find all rooks
    And  reduce all rooks to the object with rooks for team - but also only the ones that will qualified
    Then do this while loop
    And if free way assign king a castling (mapping) - otherwise if figures block add it to the figuresOnWay
    Add additional data

    Thats it
    */
  

  state.game.possibleMovesMapping = possibleMovesMapping;

 const {King: kingsIds, Rook: rooksIds} = tags.name;
  if(!kingsIds || !rooksIds) return;


  const qualifiedRooks = rooksIds.reduce((result, rookId) => {
    const rookData = indFigures[rookId].figure;
    const {team: rookTeam, madeMove} = rookData;
    if (!madeMove) {
      result[rookTeam] = rookData;
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
    ) continue;


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

      let isFreeWay = true, stepCount = 1;
      do {
      const newCoord = makeCoord(rookCol + rookColMove * stepCount, rookRow);
      stepCount++;
       if (getStepType(newCoord, boardMap, kingTeam) !== 'walk') {
          monit.figuresOnWay.push(extractId(boardMap(newCoord)))
           isFreeWay = false;
       }
  } while (rookPosition !== kingPosition);



  if(!isFreeWay)  continue;

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





