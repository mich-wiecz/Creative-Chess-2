import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

import {useSelector} from 'react-redux';
import {selectTime} from 'redux/chessSlice';

export default function TimeTravelButtons({
    onUndo,
    onRedo,
    ...props
}) {


  const {isTimeGame} = useSelector(selectTime);

    return (
        <ButtonGroup style={{width: '140px'}} {...props}>
        <Button 
        variant="light"  
        disabled={!onUndo || isTimeGame}
        onClick={onUndo}
        >
          <FontAwesomeIcon icon={faStepBackward}/>
        </Button>
        <Button 
        variant="light" 
        disabled={!onRedo || isTimeGame}
        onClick={onRedo}
        >
          <FontAwesomeIcon icon={faStepForward}/>
        </Button>
        </ButtonGroup>
    )
}
