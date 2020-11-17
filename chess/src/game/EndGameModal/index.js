import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch} from 'react-redux';
import {gameResetedToDefault, gameResetedToInitial} from 'redux/chessSlice';



export default function EndGameModal({
    show,
    onClose,
    winner = 'white',
    reason = 'checkmate'
}) {


  const dispatch = useDispatch();

    return (
        <Modal 
        show={show} 
        onHide={onClose}
        centered
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton  className="bg-myblue text-light">
          <Modal.Title>
              Zwycięstwo {" "}
              <span 
              className="text-uppercase text-success">
                  {
                  winner === "white" 
                  ? 
                  "Białych" 
                  : 
                  "Czarnych"
                  }
                  </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body  className="bg-myblue text-light">
        <p>
            {
                reason === 'checkmate'
                ?
                <span>
                    {
                    winner === "white" 
                    ? 
                    "Czarny" 
                    : 
                    "Biały"
                    }
                   {" "} król został zmatowany
                </span>
                :
                <span>
                {
                winner === "white" 
                ? 
                "Czarne" 
                : 
                "Białe"
                }
                {" "} przekroczyły czas gry
            </span>
            }
            </p>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column bg-primary">
          <Button variant="primary" 
          onClick={ () => {
            dispatch(gameResetedToInitial());
            onClose();
          }}>
            Zagraj jeszcze raz
          </Button>
          <Button variant="primary" onClick={() => {
            dispatch(gameResetedToDefault());
            onClose()
          }}>
            Skomponuj nową grę
          </Button>
          <Button onClick={onClose}>
              Graj dalej
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
