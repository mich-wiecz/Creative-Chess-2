import React, {useState, useEffect, useCallback} from 'react';
import BoardField from 'Game/BoardField';
import Timer from '../Timer';
import Button from 'react-bootstrap/Button';
import EndGameModal from 'Game/EndGameModal';
import PawnPromotion from '../PawnPromotion';
import ChessCoords from './ChessCoords';
import {normalizeCoordForGrid, getFieldData} from './functions';
import {useSelector, useDispatch} from 'react-redux';
import {moveMade, timeStarted, selectTime, selectTeams, selectStatistics, selectBoardExtremes, selectBoardMap, selectFigures, selectModelFigures, selectBoardFeatures, selectWinData} from 'redux/gameSlice';
import classes from './Board.module.css';
import { splitCoord } from 'chess/figures/functions';

export default function Board({isGameOn}) {


    const boardMap = useSelector(selectBoardMap);
    const boardExtremes = useSelector(selectBoardExtremes);
    const modelFigures = useSelector(selectModelFigures);
    const indFigures = useSelector(selectFigures);
    const state = useSelector(state => state);
    const {isTimeGame, timeStarted: hasTimeStarted} = useSelector(selectTime);
    const teams = useSelector(selectTeams);
    const {moveFor} = useSelector(selectStatistics);
    const {rotation, frozenFieldSize, boardMotive} = useSelector(selectBoardFeatures);
    const {winner, reasonForWinning} = useSelector(selectWinData);
    const dispatch = useDispatch();


    const [readyFigureToMove, setReadyFigureToMove] = useState(null);
    const [nextPosition, setNextPosition] = useState(null);
    const [possibleWalks, setPossibleWalks] = useState(new Set());
    const [possibleCaptures, setPossibleCaptures] = useState(new Set());
    const [possibleCastlings, setPossibleCastlings] = useState(new Set());
    const [updatedTime, setUpdatedTime] = useState(null);
    const [updateTimerFlag, setUpdateTimerFlag] = useState(false);
    const [showPawnPromotion, setShowPawnPromotion] = useState(false);
    const [newIdentityOfPawn, setNewIdentityOfPawn] = useState(null);
    const [newWinner, setNewWinner] = useState(null);
    const [showEndModal, setShowEndModal] = useState(true);



    useEffect(() => {

        if(winner !== newWinner ) {
            setNewWinner(winner);
        } else if (winner === newWinner && winner !== null) {
            setNewWinner(null);
        }        
    }, [winner, setNewWinner, newWinner]);



    useEffect(() => {
        if (newWinner) setShowEndModal(true);
    }, [newWinner])

    const markTimerAsUpdated = () => {
        setUpdateTimerFlag(false);
    }


    
   const fillMoveData = (state, figureId) => {
    setReadyFigureToMove(figureId);
    const {walks, captures, castlings} = state.game.figures[figureId].figure.moves;
    setPossibleWalks(new Set(walks.flat()));
    setPossibleCaptures(new Set(captures.flat()))
    if(castlings) setPossibleCastlings(new Set(castlings.flat()));
}


    
  const clearMoveData = useCallback(() => {
    setPossibleWalks(new Set());
    setPossibleCaptures(new Set());
    setReadyFigureToMove(null);
    setNextPosition(null);
    if(updatedTime) setUpdatedTime(null);
    if(newIdentityOfPawn) setNewIdentityOfPawn(null);
}, [newIdentityOfPawn, updatedTime])


    useEffect(() => {
        if (!readyFigureToMove || !nextPosition || showPawnPromotion) return;
        if (isTimeGame) {
            if(updateTimerFlag) return;
            if(!updatedTime) setUpdateTimerFlag(true);
        }
        dispatch(moveMade({
            figureId: readyFigureToMove,
            nextCoord: nextPosition,
            additional: {
                time: updatedTime,
                transform: [newIdentityOfPawn]
            }
        }))
        clearMoveData()
    }, [dispatch, updatedTime, readyFigureToMove, nextPosition, isTimeGame, updateTimerFlag, newIdentityOfPawn, showPawnPromotion, clearMoveData])





   const getTemporaryState = (coord) => {
        if (possibleWalks.has(coord)) {
           return 'walk'
        } else if(possibleCaptures.has(coord)) {
           return 'capture'
        } else if (possibleCastlings.has(coord)) return 'castling';

    }


    const handleClickOnField = (position, figureId, pawnStartRow) => {
            if (readyFigureToMove) {
                if (possibleWalks.has(position) || 
                possibleCaptures.has(position) ||
                possibleCastlings.has(position)
                ) {
                    clearMoveData();
                    setUpdateTimerFlag(true);
                    setNextPosition(position);
                    if(pawnStartRow && 
                    boardExtremes.top === splitCoord(position)[1]
                    ) { 
                        setShowPawnPromotion(true);
                    }
                } else {
                   clearMoveData();
                }
                
            } else if (figureId) {
                fillMoveData(state, figureId);
            } 
    }





    const setModeStyles = () => {
        if (isGameOn) 
            return {
                pointerEvents: 'auto',
                cursor: 'crosshair'
            }


        return {
            pointerEvents: 'none',
            cursor: 'not-allowed'
        }
    }


    function renderPawnPromotionModal () {

        const { color, figuresSet} = teams.find(({name}) => {
            return name === moveFor;
        });

        return (
            <PawnPromotion 
            show={showPawnPromotion}
            onClose={(chosenFigure) => {
                setNewIdentityOfPawn(chosenFigure);
                setShowPawnPromotion(false);
            }}
            teamFiguresArray={Object.keys(figuresSet)}
            teamColor={color}
            defaultFigure={"Queen"}
        />
        )
    }




    function createBoard (boardMap, boardExtremes, figures, modelFigures, boardMotive) {

        let boardFields = [];
        for(let coord in boardMap) {
            const coordForGrid = normalizeCoordForGrid(coord, boardExtremes),
            field = boardMap[coord],
            fieldData = getFieldData(field, 
                coordForGrid, 
                figures, 
                modelFigures,
                 boardMotive
                ),
             temporaryState = getTemporaryState(coord);
      
            boardFields.push(
                <BoardField 
                key={coord}
                style={{
                    transform: `rotate(${rotation ? rotation : 0})`,
                    gridColumn: `${coordForGrid[0]} / span 1`,
                    gridRow: `${coordForGrid[1]} / span 1`,
                }}
                position={coord}
                {...fieldData}
                temporaryState={temporaryState}
                onFieldClick={isGameOn && handleClickOnField}
                />
            )

        }
        return boardFields;
        
    }


    return (
        <>
        <div className="Container">
            {
            isTimeGame &&  
            <Timer 
            className={classes.Timer}
            newWinner={newWinner}
            updateTime={setUpdatedTime}
            updateTimerFlag={updateTimerFlag}
            markTimeAsUpdated={markTimerAsUpdated}
            />
            }
          
        <div className={classes.BoardContainer}>
            <ChessCoords.Vertical 
            className={`${classes.ChessCoords} ${classes.Vertical}`}
            />
            <div 
            style={{
                gridAutoColumns: `${frozenFieldSize ? frozenFieldSize.x : "1fr"}`,
                gridAutoRows: `${frozenFieldSize ? frozenFieldSize.y : "1fr"}`,
                ...setModeStyles()
            }}
            className={classes.BoardGrid}
            onDragStart={e => {
                e.preventDefault();
            }}
            >
            {createBoard(
                boardMap, 
                boardExtremes,
                indFigures, 
                modelFigures, 
                boardMotive
                )}
                {
                  (isTimeGame && !hasTimeStarted) &&  
                  <div className={classes.TimeStarter}>
                    <Button 
                    variant="maroon"
                    className="w-75"
                    onClick={dispatch(timeStarted())}>
                        Czas Start
                    </Button>
                </div>
                }
                
            </div>
            <ChessCoords.Horizontal 
            className={`${classes.ChessCoords} ${classes.Vertical}`}
            />
        </div>
        </div>
        {showPawnPromotion && renderPawnPromotionModal()}
            <EndGameModal 
            show={showEndModal}
            winner={winner}
            reason={reasonForWinning}
            onClose={() => setShowEndModal(false)}
            />
        </>
    )
}
