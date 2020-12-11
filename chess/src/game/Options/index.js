/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PawnSwitch from '@global-components/PawnSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CursorGif from 'assets/cursor.gif';
import DragRightGif from 'assets/drag-right.gif';
import Button from 'react-bootstrap/Button';
import {useSelector, useDispatch} from 'react-redux';
import {boardFeatureChanged, selectBoardFeatures} from 'redux/chessSlice';
import {useHistory} from 'react-router-dom'


    function   OptionWrapper ({
        disabled,
        title, 
        children, 
        ...props
    }) {
        return (
            <section 
            {...props}
            className="d-flex flex-column justify-content-center mb-4 bg-primary border-maroon py-3 px-5 position-relative"
            >
                    {
                    disabled &&
                    <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: 0,
                        right: 0,
                        background: '#0009',
                        zIndex: 9000
                    }}
                    >
                        <div
                        className="bg-secondary text-light d-flex justify-content-center align-items-center"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '0',
                            right: 0,
                            transform: 'translateY(-50%)',
                            background: 'black'
                        }}
                        >
                      <span className="py-3">Nieaktywne</span> 
                        </div>
                      
                    </div>
                }
            <span 
            className="text-center text-light mb-3">
                {title}
            </span>
            <div className="position-relative">
        
            {children}
            </div>
               
            </section>
        )
    }


    function Option ({ isOn, onToggle, ...props}) {
        return (
            <OptionWrapper {...props}>
            <PawnSwitch 
            className="mx-auto" 
            isOn={isOn}
            onToggle={onToggle}
            />
          </OptionWrapper>
        )
    }






export default function Options() {


    const history = useHistory();

    const goBackToMainPage = () => history.push('/')

    const dispatch = useDispatch(),
    {
        interactionStyle, 
        animationsOn, 
        showPossibleMoves, 
        musicOn
    } = useSelector(selectBoardFeatures);




    const handleInteractionStyle = (style) => {
        if (interactionStyle === style) return;
        dispatch(boardFeatureChanged(['interactionStyle',  style]))
    }







    function InteractionStyle ({interactionStyleName, interactionTitle, gif, alt}) {
        return (
           
            <div>
        <h6 className="text-light text-center text-uppercase">{interactionTitle}</h6>
        <Image  
           className={`cursor-pointer p-1 ${interactionStyle === interactionStyleName ? "bg-success" : ""}`}
        onClick={() => {
            handleInteractionStyle(interactionStyleName)
        } }
        width="100" 
        src={gif} 
        alt={alt}
        />
        </div>
        )
    }




    return (
        <Modal
        show={true}
        size="lg"
        centered
        aria-label="Opcja"
        onHide={goBackToMainPage}
        backdrop="static"
        style={{
            zIndex: 1300
        }}
        >
        <Modal.Header closeButton>
        <Modal.Title>
            <FontAwesomeIcon icon={faSlidersH}/>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-myblue d-flex justify-content-center" >
            <Row>
            <Col>
           <Option 
            title="Animacje szachownicy"
            aria-label="Przełączanie animacji szachownicy"
            isOn={animationsOn}
            onToggle={() => {
                    dispatch(boardFeatureChanged([ 'animationsOn', !animationsOn]))
            } }
           />
           <Option 
            title="Pokazywanie możliwych posunięć"
            aria-label="Przełączanie pokazywania możliwych posunięć"
            isOn={showPossibleMoves}
            onToggle={() =>  {
                    dispatch(boardFeatureChanged(['showPossibleMoves',  !showPossibleMoves]))
                }}
           />
           <Option 
           disabled
            title="Muzyka"
            aria-label="Przełączanie muzyki"
            isOn={musicOn}
            onToggle={() => {
                    dispatch(boardFeatureChanged(['musicOn', !musicOn]))
            }}
           />
            <OptionWrapper
            disabled
            title="Sposób przemieszczania figur"
            aria-label="Sposób przemieszczania figur"
            className=""
            >
                 <div className="d-flex justify-content-between">
                <InteractionStyle 
                interactionStyleName="dragging"
                interactionTitle="Przeciąganie"
                gif={DragRightGif}
                alt="Przeciąganie elementu przy pomocy kursora"
                />
                <InteractionStyle 
                interactionStyleName="clicking"
                interactionTitle="Klikanie"
                gif={CursorGif}
                alt="Klikanie na pole"
                />
                </div>
            </OptionWrapper>
           </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
        <Button onClick={goBackToMainPage}>
           Zamknij opcje 
        </Button>
        </Modal.Footer>
      </Modal>
    )
}
