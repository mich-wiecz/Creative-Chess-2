import React from 'react';
import TimeTravelButtons from '@global-components/TimeTravelButtons';
import MainBar from '@global-components/MainBar';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import GameInfo from './GameInfo';
import {moveUndone, moveRedone, playgroundActivated, selectGameHistory} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';

export default function GameBar() {

  const {position,history} = useSelector(selectGameHistory);
   const dispatch = useDispatch()

    return (
      <>
        <MainBar >
          <Navbar expand="xs" className="w-100 w-lg-50 justify-content-center p-0 m-0 flex-nowrap" style={{position: 'relative'}}>
          <Navbar.Collapse 
          className="bg-primary text-light m-0 rounded p-2"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: -1,
            opacity: '0.8'
          }}
          id="game-info"
          >  
                <GameInfo/>
            </Navbar.Collapse>  
             
                  <TimeTravelButtons 
                  onUndo={position !== 0 && (() => dispatch(moveUndone()))}
                  onRedo={position < history.length - 1 && (() => dispatch(moveRedone()))}
                  />
                 <Button 
                 onClick={() => dispatch(playgroundActivated())}
                 className="flex-grow-1 bg-myblue text-uppercase letter-spacing-default"
                 > 
                   Stop
                    </Button>   
          <Navbar.Toggle 
          style={{width: '70px'}}
            className="bg-myblue"
          aria-controls="game-info" 
          >
            <FontAwesomeIcon icon={faInfo} size={'lg'}/>
            </Navbar.Toggle>
                    </Navbar>
        </MainBar>

        </>
    )
}
