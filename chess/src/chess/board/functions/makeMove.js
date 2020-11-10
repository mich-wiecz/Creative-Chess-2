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

function getKingData (gameData, actualTeam) {
    const kingIdsArray = gameData.tags.name.King;
    for(let kingId of kingIdsArray) {
        const {team: teamOfKing, position, id} = gameData.figures[kingId].figure;
        if (teamOfKing === actualTeam) return [position, id];
    }
}


function checkIsKingInDanger (kingPosition, possibleMovesMapping) {
   
    
    const {captures: kingCaptures} = possibleMovesMapping[kingPosition];
    if (kingCaptures.length > 0) return true;
    return false;
}

function getEnemyTeam (team, teams) {
    for(let teamName of teams) {
        if (teamName !== team) return teamName;
    }
    
}



function isCheckmate (kingId, figures, possibleMovesMapping) {

   

    const {position: kingPosition, team: kingTeam, moves: kingMoves} = figures[kingId].figure;
    const {captures} = possibleMovesMapping[kingPosition];
    const capturesLength = captures.length
    if (capturesLength === 0) return false;
    if (capturesLength > 0) {

        const areManyEnemies = capturesLength > 1;

        const [enemyId, enemyMovesSequenceIndex] = captures[0].split('##');
        const {position: enemyPosition, moves: enemyMoves} = figures[enemyId].figure;
        if (!areManyEnemies && possibleMovesMapping[enemyPosition].captures.length > 0) return false;

        let coords;
        if (areManyEnemies) {
            let sharedCoords;
            for(let mappingFigureId of captures) {
                const [enemyId, enemyMovesSequenceIndex] = mappingFigureId.split('##');
            const { moves: enemyMoves} = figures[enemyId].figure;
        
                    if (!sharedCoords) {
                        sharedCoords = enemyMoves.captures[enemyMovesSequenceIndex];
                    } else {
                        sharedCoords.splice(0, 0, ...enemyMoves.captures[enemyMovesSequenceIndex]);
                        sharedCoords = Array.from(new Set(sharedCoords));
                        if (sharedCoords.length === 0) return true;
                    }
            }
            coords = sharedCoords;
        } else {
            coords = enemyMoves.walks[enemyMovesSequenceIndex]
        }
     
       for(let coord of  coords) {
           const {walks} = possibleMovesMapping[coord];
            if (walks.length > 0) {
                for(let mappingFigureId of walks) {
                    const [figId] = mappingFigureId.split('##');
                    const {team} = figures[figId].figure;
                    if (team === kingTeam) return false;
                }   
                
            }
       }

    }



   for(let moveType of ['walks', 'captures']) {
       const movesSequences = kingMoves[moveType];
    for(let movesSequence of movesSequences) {
        for(let coord of movesSequences[movesSequence]) {
            const {captures} = possibleMovesMapping[coord]
            if(captures.length === 0) return false;
            for(let figureMappingId of captures) {
                const [figureId] = figureMappingId.split('##');
                const {team} = figures[figureId].figure;
                if (team === kingTeam) return false;
            }
            
        }
        
    }
        
   }
   
    return true;

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
            !gameDataDraft.winner &&
            additional.hasOwnProperty('watchForTheKing') &&
            additional.watchForTheKing === true
        ) {

            const [fellowKingPosition] = getKingData(gameDataDraft, team);
            const enemyTeam = getEnemyTeam(team, gameDataDraft.teams);
            const [, enemyKingId] = getKingData(gameDataDraft, enemyTeam)
         
            if (checkIsKingInDanger(fellowKingPosition, possibleMovesMapping)) {
                kingInDanger = true;
                actualTeam = team;
                return;
            } else {
                kingInDanger = false;
                statistics[team].wasPreviousMoveEndangeringKing = false;
                if(isCheckmate(enemyKingId, figures, possibleMovesMapping)) {
                    gameDataDraft.winner = team;
                }
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

