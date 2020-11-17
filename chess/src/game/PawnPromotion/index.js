import React, {useState, useEffect} from 'react';
import * as Figures from 'assets/figures';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChoosableWrapper from '@global-components/ChoosableWrapper';
import toUpperFirst from '@global-functions/toUpperFirst';

export default function PawnPromotion({
teamFiguresArray,
teamColor,
show,
onClose,
defaultFigure
}) {


  const [chosenFigure, setChosenFigure] = useState('');

    useEffect(() => {
      setChosenFigure(defaultFigure)
    }, [defaultFigure])


    return (
    
        <Modal 
        show={show} 
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header>
          <div className="d-flex flex-column">
          <Modal.Title>Promocja piona</Modal.Title>
          <p className="text-muted">
              Pion doszedł do końca planszy, więc musisz go awansować na dowolną figurę (oprócz króla).
          </p>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-primary">
        <Row className="justify-content-center">
          {
            teamFiguresArray.map(figure => {
              const capitalizedFigure = toUpperFirst(figure);
              if (capitalizedFigure === "King" || capitalizedFigure === "Pawn") return null;
              const FigureSvg = Figures[toUpperFirst(figure)]
             const  isCurrentlyChosen = chosenFigure === capitalizedFigure;
              return (
                <Col key={figure} className="mb-4" xs={6} md={4}>
                <ChoosableWrapper
                isOn={isCurrentlyChosen}
                onClick={!isCurrentlyChosen && (() => setChosenFigure(capitalizedFigure))}
                >
                    <FigureSvg 
                    className="rounded cursor-pointer"
                    style={{
                      background: 'gray',
                     fill: teamColor
                     }}/>
                    </ChoosableWrapper>
                </Col>
              )
            }) 
          }
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onClose(chosenFigure)}>
            Zatwierdź
          </Button>
        </Modal.Footer>
      </Modal> 
    )
}
