import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';


export default function TimeTravelButtons({
    onUndo,
    onRedo,
    ...props
}) {
    return (
        <ButtonGroup style={{width: '140px'}} {...props}>
        <Button 
        variant="light"  
        disabled={!onUndo}
        onClick={onUndo}
        >
          <FontAwesomeIcon icon={faStepBackward}/>
        </Button>
        <Button 
        variant="light" 
        disabled={!onRedo}
        onRedo={onRedo}
        >
          <FontAwesomeIcon icon={faStepForward}/>
        </Button>
        </ButtonGroup>
    )
}
