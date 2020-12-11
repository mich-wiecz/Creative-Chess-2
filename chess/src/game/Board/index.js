import React, {} from 'react';
import FireButton from '@global-components/FireButton';
import Spinner from 'react-bootstrap/Spinner';
import ActualBoard from './ActualBoard';
import Timer from '../Timer';
import Button from 'react-bootstrap/Button';
import EndGameModal from 'Game/EndGameModal';
import PawnPromotion from '../PawnPromotion';
import ChessCoords from './ChessCoords';
import {useSelector, useDispatch} from 'react-redux';
import {timeStarted, selectTime, selectTeams, selectStatistics, selectBoardExtremes, selectBoardMap, selectIndividualFigures, selectModelFigures, selectBoardFeatures, selectWinData,  gameActivated} from 'redux/chessSlice';
import classes from './Board.module.scss';
import useBoardStore from './boardStore'





function MiddleButton({
    isGameOn,
    isTimeGame,
    hasTimeStarted,
    startTime,
    activateGame
}) {

    if (isGameOn && (isTimeGame ? hasTimeStarted : true) ) return null;

 return (
 <div className={classes.Starter}>
       {
         (isTimeGame && !hasTimeStarted) 
         ?
         <Button 
         variant="maroon"
         className="w-75"
         onClick={startTime}>
             Czas Start
         </Button>
         :
         <FireButton className="w-50" onClick={activateGame}>
         Graj!
         </FireButton>
       }
 </div>
 )
 }



   function MakingMoveSpinner() {
       return (
        <div
        className="d-flex flex-column justify-content-center align-items-center"
         style={{
            position: 'absolute',
            top: "50%",
            left: "50%",
            transform: 'translate(-50%, -50%)',
            width: 150,
            height: 150,
            zIndex: 100000
        }}
        >
        <Spinner 
         style={{
            width: 100,
            height: 100,
        }}
        animation="border" 
        role="status" 
        variant="primary"
        />
        </div>
       )
   }





export default function Board({isGameOn}) {



    const boardMap = useSelector(selectBoardMap);
    const boardExtremes = useSelector(selectBoardExtremes);
    const modelFigures = useSelector(selectModelFigures);
    const indFigures = useSelector(selectIndividualFigures);
    const {isTimeGame, timeStarted: hasTimeStarted} = useSelector(selectTime);
    const teams = useSelector(selectTeams);
    const {moveFor} = useSelector(selectStatistics);
    const {
        rotation: { boardRotation, fieldsRotation}, 
        frozenFieldSize, 
        boardMotive,
        showPossibleMoves
    } = useSelector(selectBoardFeatures);
    const {winner, reasonForWinning} = useSelector(selectWinData);
    const dispatch = useDispatch();


     const [
        {
            updateTimerFlag,
            showPawnPromotion,
           showEndModal,
           loading
            },
            {
                handleClickOnField,
                getTemporaryState,
                markTimerAsUpdated,
                handlePawnPromotion,
                setUpdatedTime,
                closeEndModal
            }
     ] = useBoardStore()



    function renderPawnPromotionModal () {

        const { color, figuresSet} = teams.find(({name}) => {
            return name === moveFor;
        });

        return (
            <PawnPromotion 
            show={showPawnPromotion}
            onClose={handlePawnPromotion}
            teamFiguresArray={Object.keys(figuresSet)}
            teamColor={color}
            defaultFigure={"Queen"}
        />
        )
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
                gridAutoColumns: "7.5vmin",
                gridAutoRows: "7.5vmin"
            }
        }


        return {
            ...modesStyles,
            ...sizeStyles,
        }

      
    }




    return (
        <>
        <div className={classes.Container}>
        <div 
        className={classes.BoardContainer}
        style={{
            transform: `rotate(${boardRotation ? boardRotation : 0}deg)`
        }}
        >
        {
            isTimeGame &&  
            <Timer 
            className={classes.Timer}
            updateTime={setUpdatedTime}
            updateTimerFlag={updateTimerFlag}
            markTimerAsUpdated={markTimerAsUpdated}
            />
        }

            <div 
            style={setBoardStyles()}
            className={`${classes.BoardGrid} position-relative`}
            onDragStart={e => {
                e.preventDefault();
            }}
            >
                <ChessCoords.Vertical 
            className={`${classes.ChessCoords} ${classes.Vertical}`}
            boardExtremes={boardExtremes}
            />
            {loading &&  <MakingMoveSpinner />}
         
            <ActualBoard 
            boardMap={boardMap}
            boardExtremes={boardExtremes}
            figures={indFigures}
            modelFigures={modelFigures}
            boardMotive={boardMotive}
            getTemporaryState={getTemporaryState}
            showPossibleMoves={showPossibleMoves}
            boardRotation={boardRotation}
            isGameOn={isGameOn}
            isTimeGame={isTimeGame}
            hasTimeStarted={hasTimeStarted}
            handleClickOnField={handleClickOnField}
            fieldsRotation={fieldsRotation}
            />
                 
                <MiddleButton 
                isGameOn={isGameOn}
                isTimeGame={isTimeGame}
                hasTimeStarted={hasTimeStarted}
                startTime={() => dispatch(timeStarted())}
                activateGame={() => dispatch(gameActivated())}
                />
                 <ChessCoords.Horizontal 
            className={`${classes.ChessCoords} ${classes.Horizontal}`}
            boardExtremes={boardExtremes}
            />
            </div>
        </div>
        </div>
        {showPawnPromotion && renderPawnPromotionModal()}
            <EndGameModal 
            show={showEndModal}
            winner={winner}
            reason={reasonForWinning}
            onClose={closeEndModal}
            />
        </>
    )
}
