import React from 'react';
import TimeTravelButtons from 'Playground/PlaygroundBar/node_modules/@global-components/TimeTravelButtons';
import MainBar from 'Playground/PlaygroundBar/node_modules/@global-components/MainBar';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import GameInfo from './GameInfo';

export default function InfoPanel() {


    return (
      <>
        <MainBar >
          <Navbar expand="xs" className="w-100 justify-content-center px-0" style={{position: 'relative'}}>
          <Navbar.Toggle 
          style={{width: '70px'}}
            className="bg-myblue"
          aria-controls="game-info" 
          >
            <FontAwesomeIcon icon={faInfo} size={'lg'}/>
            </Navbar.Toggle>
          <Navbar.Collapse 
          className="bg-primary text-light m-0 rounded border-maroon p-2"
          style={{
            position: 'absolute',
            top: '80%',
            left: 0,
            right: 0,
            zIndex: -1,
          }}
          id="game-info">  
                 <GameInfo 
                  turn={0}
                  moveFor="white"
                  madeMoves={0}
                  />
            </Navbar.Collapse>  
             
                  <TimeTravelButtons />
                 <Button className="flex-grow-1 bg-myblue text-uppercase letter-spacing-default"> 
                   Stop
                    </Button>   
                    </Navbar>
        </MainBar>

        </>
    )
}
