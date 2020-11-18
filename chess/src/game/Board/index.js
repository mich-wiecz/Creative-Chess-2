import React, {useState, useEffect, useCallback} from 'react';
import FireButton from '@global-components/FireButton';
import BoardField from 'Game/BoardField';
import Timer from '../Timer';
import Button from 'react-bootstrap/Button';
import EndGameModal from 'Game/EndGameModal';
import PawnPromotion from '../PawnPromotion';
import ChessCoords from './ChessCoords';
import {normalizeCoordForGrid, getFieldData} from './functions';
import {useSelector, useDispatch} from 'react-redux';
import {moveMade, timeStarted, selectTime, selectTeams, selectStatistics, selectBoardExtremes, selectBoardMap, selectIndividualFigures, selectModelFigures, selectBoardFeatures, selectWinData, selectWholeChessState, gameActivated} from 'redux/chessSlice';
import classes from './Board.module.scss';
import { splitCoord } from 'chess/figures/functions';

export default function Board({isGameOn}) {


    const boardMap = useSelector(selectBoardMap);
    const boardExtremes = useSelector(selectBoardExtremes);
    const modelFigures = useSelector(selectModelFigures);
    const indFigures = useSelector(selectIndividualFigures);
    const state = useSelector(selectWholeChessState);
    const {isTimeGame, timeStarted: hasTimeStarted} = useSelector(selectTime);
    const teams = useSelector(selectTeams);
    const {moveFor} = useSelector(selectStatistics);
    const {
        rotation: {fieldsRotation, boardRotation}, 
        frozenFieldSize, 
        boardMotive,
        animationsOn,
        showPossibleMoves
    } = useSelector(selectBoardFeatures);
    const {winner, reasonForWinning} = useSelector(selectWinData);
    const dispatch = useDispatch();


    const [readyFigureToMove, setReadyFigureToMove] = useState(null);
    const [readyFigurePosition, setReadyFigurePosition] = useState(null);
    const [nextPosition, setNextPosition] = useState(null);
    const [possibleWalks, setPossibleWalks] = useState(new Set());
    const [possibleCaptures, setPossibleCaptures] = useState(new Set());
    const [possibleCastlings, setPossibleCastlings] = useState(new Set());
    const [updatedTime, setUpdatedTime] = useState(null);
    const [updateTimerFlag, setUpdateTimerFlag] = useState(false);
    const [pawnDirection, setPawnDirection] = useState(null);
    const [showPawnPromotion, setShowPawnPromotion] = useState(false);
    const [newIdentityOfPawn, setNewIdentityOfPawn] = useState(null);
    const [newWinner, setNewWinner] = useState(null);
    const [showEndModal, setShowEndModal] = useState(false);



    useEffect(() => {
        if (winner === newWinner) return;
        if(winner !== newWinner ) {
            setNewWinner(winner);
          if(winner !== null) {
            setShowEndModal(true);
          } 
        }      
    }, [winner, setNewWinner, newWinner]);




    const markTimerAsUpdated = () => {
        setUpdateTimerFlag(false);
    }


    
   const fillMoveData = (state, position, {id, ...rest}) => {
    setReadyFigureToMove(id);
    setReadyFigurePosition(position);
    const {walks, captures, castlings} = state.game.figures[id].figure.moves;
    setPossibleWalks(new Set(walks.flat()));
    setPossibleCaptures(new Set(captures.flat()))
    if(castlings) setPossibleCastlings(new Set(castlings.flat()));
    if (rest.pawnDirection) setPawnDirection(rest.pawnDirection);
}


    
  const clearMoveData = useCallback(() => {
    setPossibleWalks(new Set());
    setPossibleCaptures(new Set());
    setPossibleCastlings(new Set());
    setReadyFigureToMove(null);
    setReadyFigurePosition(null);
    setNextPosition(null);
    if(updatedTime) setUpdatedTime(null);
    if(newIdentityOfPawn) setNewIdentityOfPawn(null);
    if(pawnDirection) setPawnDirection(null);
}, [newIdentityOfPawn, updatedTime, pawnDirection])


    useEffect(() => {
        if (!readyFigureToMove || !nextPosition || showPawnPromotion) return;   
        if (isTimeGame) {
            if(updateTimerFlag && !updatedTime){
                setUpdateTimerFlag(true);
                return;
            }
            // if(!updatedTime) 
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





   const getTemporaryState = (coord, showPossibleMoves) => {
       if (readyFigurePosition === coord) return 'walk';
       if(!showPossibleMoves) return;
        if (possibleWalks.has(coord)) {
           return 'walk'
        } else if(possibleCaptures.has(coord)) {
           return 'capture'
        } else if (possibleCastlings.has(coord)) return 'castling';

    }


    const handleClickOnField = (position, figureData) => {

        function handlePawnNextMove() {
            const nextRow = splitCoord(position)[1];

            if ((
                pawnDirection === 'forward' &&
                boardExtremes.top === nextRow
            ) ||
                (
                    pawnDirection === 'downward' &&
                    boardExtremes.bottom === nextRow
                ))
                setShowPawnPromotion(true);
        }


        function handleReadyFigure() {


            const isProperPosition = possibleWalks.has(position) ||
                possibleCaptures.has(position) ||
                possibleCastlings.has(position);

            if (isProperPosition) {
                if (isTimeGame) {
                    setUpdateTimerFlag(true);
                }
                if (pawnDirection) {
                    handlePawnNextMove();
                }
                setNextPosition(position);
            } else if (figureData && figureData.team === moveFor) {
                fillMoveData(state, position, figureData);

            } else {
                clearMoveData();
            }
        }


            if (readyFigureToMove) {
                handleReadyFigure();
            } else  if (figureData && figureData.team === moveFor) {
                fillMoveData(state, position, figureData);
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
             temporaryState = getTemporaryState(coord, showPossibleMoves);
      
            boardFields.push(
                <BoardField 
                key={coord}
                style={{
                    transform: `rotate(${fieldsRotation ? fieldsRotation : 0}deg)`,
                    gridColumn: `${coordForGrid[0]} / span 1`,
                    gridRow: `${coordForGrid[1]} / span 1`,
                }}
                position={coord}
                {...fieldData}
                temporaryState={temporaryState}
                onFieldClick={
                    (isGameOn && 
                    (isTimeGame ? hasTimeStarted : true)
                    ) 
                    ? 
                    handleClickOnField 
                    : 
                    undefined
                }
                />
            )

        }
        return boardFields;
        
    }



    const setBoardStyles = () => {
        let modesStyles = {}, sizeStyles = {};
        if (isGameOn) {
           modesStyles = {
                cursor: 'cell'
           }
        } else {
            modesStyles =  {
                cursor: 'no-drop'
            }
        }

        if (frozenFieldSize) {
            sizeStyles = {
                gridAutoColumns: frozenFieldSize.x ,
                gridAutoRows:  frozenFieldSize.y 
            }
        } else {
            sizeStyles = {
                gridAutoColumns: "minmax(40px, 6vmin)",
                gridAutoRows: "minmax(40px, 6vmin)"
            }
        }


        return {
            ...modesStyles,
            ...sizeStyles,
            transform: `rotate(${boardRotation ? boardRotation : 0}deg)`
        }

      
    }


    function MiddleButton() {

       if (isGameOn) return null;

    return (
    <div className={classes.Starter}>
          {
            isTimeGame && !hasTimeStarted 
            ?
            <Button 
            variant="maroon"
            className="w-75"
            onClick={() => dispatch(timeStarted())}>
                Czas Start
            </Button>
            :
            <FireButton className="w-50" onClick={() => dispatch(gameActivated())}>
            Graj!
            </FireButton>
          }
    </div>
    )
    }

    return (
        <>
        <div className={classes.Container}>
            {
            isTimeGame &&  
            <Timer 
            className={classes.Timer}
            newWinner={newWinner}
            updateTime={setUpdatedTime}
            updateTimerFlag={updateTimerFlag}
            markTimerAsUpdated={markTimerAsUpdated}
            />
            }
          
        <div className={classes.BoardContainer}>
            
            <div 
            style={setBoardStyles()}
            className={classes.BoardGrid}
            onDragStart={e => {
                e.preventDefault();
            }}
            >
                <ChessCoords.Vertical 
            className={`${classes.ChessCoords} ${classes.Vertical}`}
            />
            {createBoard(
                boardMap, 
                boardExtremes,
                indFigures, 
                modelFigures, 
                boardMotive
                )}
                 
                <MiddleButton />
                 <ChessCoords.Horizontal 
            className={`${classes.ChessCoords} ${classes.Horizontal}`}
            />
            </div>
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
