import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import classes from './WaitingModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faDove
 } from '@fortawesome/free-solid-svg-icons';


export  function WaitingModal() {
    return (
        <Modal
        show={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h2>
             Trwa ładowanie zawartości strony
             <span className={classes.AnimatedDot}>.</span>
             <span className={classes.AnimatedDot}>.</span>
             <span className={classes.AnimatedDot}>.</span>
         </h2>

        <Spinner animation="border" role="status">
        <span className="sr-only">Ładowanie...</span> 
        </Spinner>

        </Modal.Body>
        <Modal.Footer>
        <p className="text-muted">Czas na chwilę relaksu.. <FontAwesomeIcon icon={faDove}/></p>
        </Modal.Footer>
      </Modal>
    )
}
