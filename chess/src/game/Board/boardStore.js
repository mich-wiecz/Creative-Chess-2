import {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {moveMade, selectTime, selectStatistics, selectBoardExtremes, selectWinData, selectWholeChessState} from 'redux/chessSlice';
import { splitCoord } from 'chess/figures/functions';
import {useToasts} from 'contexts/ToastProvider';




const toastTitle = "Szachownica",
toasts = {
wasBadCastling: 0,
wasPreviousMoveEndangeringKing: 1,
}



export default function useBoardStore () {

    const boardExtremes = useSelector(selectBoardExtremes);
    const state = useSelector(selectWholeChessState);
    const {isTimeGame} = useSelector(selectTime);
    const {moveFor, movesDone, ...restStatistics} = useSelector(selectStatistics);
    const {winner, movesDoneWhenWin} = useSelector(selectWinData);
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
    const [loading, setLoading] = useState(false);






    const [showToast, createToast] = useToasts();
    let prevBadCastling = useRef(false);
    let prevKingEndangered = useRef(false);
    let loadingDeferId = useRef(null);
    let prevMovesDone = useRef(0);



    useEffect(() => {  
        Object.values(toasts).forEach(toastName => {
            createToast(toastName, {
                title: toastTitle,
            });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


 
   /**
    * Toasts for wrong moves
    */
    useEffect(() => {
        
        const teamStatistics = restStatistics[moveFor];
       
            if (teamStatistics.wasBadCastling) {
                if (prevBadCastling.current === teamStatistics.wasBadCastling) return;
                showToast(toasts.wasBadCastling, "Roszada niezgodna z zasadami! Pole po którym przemiaszczał by się król jest 'atakowane'");
                prevBadCastling.current = true;
                
            } else if (prevBadCastling.current) {
                prevBadCastling.current = false;
            }
           

 
            if ( teamStatistics.wasPreviousMoveEndangeringKing) {
                if(prevKingEndangered.current === teamStatistics.wasPreviousMoveEndangeringKing ) return;
                showToast(toasts.wasPreviousMoveEndangeringKing, "Błędny ruch! Król mógłby zostać zbity");
                prevKingEndangered.current = true;
            } else if (prevKingEndangered.current) {
            prevKingEndangered.current = false;
            }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moveFor, restStatistics])



    useEffect(() => {
        if (winner !== newWinner && movesDoneWhenWin === movesDone) {
            if(winner !== null) {
                setShowEndModal(true);
              } 
            setNewWinner(winner);
        }   
    }, [winner, setNewWinner, newWinner, movesDoneWhenWin, movesDone]);




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
    if (movesDone !== prevMovesDone.current) {
        /**
       * To clear decorated fields when they are not actual
       */
        clearLoading()   
        clearMoveData()
        prevMovesDone.current = movesDone;
    }
  }, [movesDone, clearMoveData])


  const clearLoading = () => {
    clearTimeout(loadingDeferId.current)
    setLoading(false);
  }
  


   useEffect(() => {
    const teamStatistics = restStatistics[moveFor];

    if ( teamStatistics.wasBadCastling || 
        teamStatistics.wasPreviousMoveEndangeringKing) {
       clearLoading()
    }
   }, [ restStatistics, moveFor])


    useEffect(() => {
        if (!readyFigureToMove || !nextPosition || showPawnPromotion) return;   
        if (isTimeGame) {
            if(updateTimerFlag && !updatedTime){
                setUpdateTimerFlag(true);
                return;
            }
        }
        loadingDeferId.current = setTimeout(() => {
            setLoading(true);
        }, 1000) 
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



    const handlePawnPromotion = (chosenFigure) => {
        setNewIdentityOfPawn(chosenFigure);
        setShowPawnPromotion(false);
    }

    const closeEndModal = () => {
        setShowEndModal(false)
    }



    return  [
        {
        updateTimerFlag,
        showPawnPromotion,
       showEndModal,
       newWinner,
       loading
        },
        {
            handleClickOnField,
            getTemporaryState,
            markTimerAsUpdated,
            setNewIdentityOfPawn,
            handlePawnPromotion,
            setUpdatedTime,
            closeEndModal
        }
    ]




}


