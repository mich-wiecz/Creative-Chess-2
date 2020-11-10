import { createNextState as produce } from '@reduxjs/toolkit'
import { dataStore } from '../../store.js';
import generatePossibleMoves, {getPossibleMoves} from './generatePossibleMoves';
import { extractIndex, isStringFigure } from 'chess/figures/functions.js';



function updateFigureData (figure, property, newValue, tags) {
    if (!figure.hasOwnProperty(property)) throw new Error(`Property: ${property} does not exist on provided figure`);
    const oldValue = figure[property];
    figure[property] = newValue;

    if (!tags.hasOwnProperty(property) || oldValue === newValue) return;

    const {id} = figure;
    const tag = tags[property];
    tag[oldValue] =  tag[oldValue].filter(figId => figId !== id);
    tag[newValue] = [...tag[newValue], id];

}



function findMovesSchemaDataForSequence (memoizedMovesSchema, sequenceIndex) {
    let index = -1,
    allStepsObjects = 0;
   const movesSchemaLength = memoizedMovesSchema.length;

   while (++index < movesSchemaLength) {
       const { steps: stepsArray} = memoizedMovesSchema[index],
                stepsObjectsAmount = stepsArray.length;

    allStepsObjects += stepsObjectsAmount;

    if (allStepsObjects >= sequenceIndex) {
        const stepsIndex = stepsObjectsAmount - (allStepsObjects - sequenceIndex);

      const foundedStep = stepsArray[stepsIndex],
       foundedStepsObject = memoizedMovesSchema[index];

       return [
        foundedStepsObject, 
        foundedStep
    ]
       
    }
   }

}



function removeAllFigMovesFromMapping (moves, possibleMovesMapping) {
    for(let moveType in moves) {
        moves[moveType].forEach(stepSequence => {
            stepSequence.forEach(seqCoord => {
                const coordMapping = possibleMovesMapping[seqCoord][moveType];
                possibleMovesMapping[seqCoord][moveType] = coordMapping.filter(mapCoord => !mapCoord.includes(seqCoord))
            })
        })
    }
}



function correctOtherFigsPossibleMoves(position, figures, boardMap, possibleMovesMapping) {

    ['captures', 'blocks'].forEach(moveType => {

        const mappingMoveArray = possibleMovesMapping[position][moveType];


        if(mappingMoveArray.length > 0 ) {
            mappingMoveArray.forEach(figMappingId => {
    
                const [otherFigId, otherFigSequenceIndex] = figMappingId.split('##'),
                {figure: otherFigure} = figures[otherFigId];
    
                const {movesPossibilities} = figures
                const {moves, memoizedMovesSchema} = movesPossibilities[otherFigId].figure;
               
                (function removeStaleCoord () {
                    moves[moveType] = [];
                })()
    
               const [foundedStepsObject, foundedStep] = findMovesSchemaDataForSequence(memoizedMovesSchema, otherFigSequenceIndex);
    
                const proxyMovesSchema = [
                    {
                    ...foundedStepsObject,
                    steps: [foundedStep]
                    }
                ]
    
                const lackingMoves = getPossibleMoves(
                    position,
                    otherFigure,
                    proxyMovesSchema,
                    otherFigSequenceIndex,
                    boardMap,
                    possibleMovesMapping
                );
    
                for(let moveType in moves) {
                    moves[moveType][otherFigSequenceIndex].push(...lackingMoves[moveType[0]])
                }
                
            })
    
            possibleMovesMapping[position][moveType] = [];
        }

    })




}



function isMoveCapture (boardField) {
    if(isStringFigure(boardField)) return true;
    return false;
 }


function killCapturedFigure(capturedFig, tags, possibleMovesMapping) {
       

    const updateCapturedFigure = (property, newValue) => updateFigureData(
        capturedFig,
        property,
        newValue,
        tags
    )

    updateCapturedFigure('position', null);
    updateCapturedFigure('status', 'captured');

    const {moves} = capturedFig.movesPossibilities;
    removeAllFigMovesFromMapping(moves, possibleMovesMapping);
        
    updateCapturedFigure('movesPossibilities', {});
   }



   
   function updateFigure (
    figures, 
    figureId,
    nextCoord,
    boardMap, 
    possibleMovesMapping, 
    tags
    ) {
        const {figure} = figures[figureId];
    const {moves: figMoves} = figure.movesPossibilities;
    removeAllFigMovesFromMapping(figMoves, possibleMovesMapping);
    updateFigureData(figure, 'position', nextCoord, tags);
    generatePossibleMoves(
        {[figureId]: figures[figureId]},
        boardMap,
        possibleMovesMapping
    )
}


function updateTime (statistics, timeObject) {
    for(let teamName in timeObject) {
        statistics[teamName].time = timeObject[teamName];
        }
}


function addNextGameDataToHistory (newGameData) {
    const {gameHistory} =  dataStore.history.defaultGame;
    const newHistoryState = produce(gameHistory, historyDraft => {

        const {history, limit, position} = historyDraft;

        const length = history.length;
    
        if (position !== length - 1) {
            history.splice(position + 1);
        }
    
        if (length >= limit) {
            const tooMuchCount = length - limit - 1;
            history.splice(0, tooMuchCount)
        }
    
        history.push({...newGameData});
        history.position++;

    })

    dataStore.history.defaultGame.gameHistory = newHistoryState;
}

function getKingPosition (gameData, actualTeam) {
    const kingIdsArray = gameData.tags.name.King;
    for(let kingId of kingIdsArray) {
        const {team: teamOfKing, position} = gameData.figures[kingId].figure;
        if (teamOfKing === actualTeam) return position;
    }
}


function checkIsKingInDanger (gameData, actualTeam, possibleMovesMapping) {
   
    const kingPosition = getKingPosition(gameData, actualTeam);
    const {captures: kingCaptures} = possibleMovesMapping[kingPosition];
    if (kingCaptures.length > 0) return true;
    return false;
}


export default function makeMove(figureId, nextCoord, additional) {
     const {defaultGame} = dataStore;
   
     let kingInDanger, actualTeam;

    const newGameData = produce(defaultGame, gameDataDraft => {


        const {
            figures, 
            possibleMovesMapping, 
            boardMap, 
            tags, 
            statistics
        } = gameDataDraft; 


        const {figure} = figures[figureId];
        const {position, team} = figure;

        const nextCoordField = boardMap[nextCoord],
         capturedFigIndex = isMoveCapture(nextCoordField) ? extractIndex(nextCoordField) : null;
        boardMap[nextCoord] = boardMap[position];
        boardMap[position] = 'blanc';



        correctOtherFigsPossibleMoves( position, figures, boardMap, possibleMovesMapping);


        if (
            additional.hasOwnProperty('watchForTheKing') &&
            additional.watchForTheKing === true
        ) {

            if (checkIsKingInDanger(gameDataDraft, team, possibleMovesMapping)) {
                kingInDanger = true;
                actualTeam = team;
                return;
            } else {
                kingInDanger = false;
                statistics[team].wasPreviousMoveEndangeringKing = false;
            }
        }
        
  

        if (capturedFigIndex) {
            const {figure: capturedFig} = figures[capturedFigIndex]
            killCapturedFigure(capturedFig, tags, possibleMovesMapping);
        }


        updateFigure(
            figures, 
            figureId,
            nextCoord,
            boardMap, 
            possibleMovesMapping, 
            tags
            );



            if (additional.hasOwnProperty('time')) updateTime(statistics, additional.time)

        
    })


    let updatedGameData;
    if(!kingInDanger) {
        updatedGameData =  newGameData;
        addNextGameDataToHistory(newGameData);
    } else {
        updatedGameData = produce(defaultGame, gameDataDraft => {
            gameDataDraft.statistics[actualTeam].wasPreviousMoveEndangeringKing = true;
        })
    }

    dataStore.defaultGame = updatedGameData;
    
}

