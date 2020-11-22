import React from 'react';
import Modal from 'react-bootstrap/Modal';
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
        size="lg"
        centered
        styles={{
          zIndex: 18000
        }}
      >
        <Modal.Body>
         <h2>
             Trwa ładowanie zawartości strony
             <span className={classes.AnimatedDot}>.</span>
             <span className={classes.AnimatedDot}>.</span>
             <span className={classes.AnimatedDot}>.</span>
         </h2>

        </Modal.Body>
        <Modal.Footer>
        <p className="text-muted mr-3">Czas na chwilę relaksu.. <FontAwesomeIcon icon={faDove}/></p>
        </Modal.Footer>
      </Modal>
    )
}
