/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import PawnSwitch from '@global-components/PawnSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CursorGif from 'assets/cursor.gif';
import DragRightGif from 'assets/drag-right.gif';
import {useToasts} from 'contexts/ToastProvider';
import Button from 'react-bootstrap/Button';

    const toastTitle = "Opcja zmieniona"

    const toasts = {
     animation: 0,
     possibleMoves: 1,
     music: 2,
     interaction: 3,
    }



export default function Options() {


    const [interactionStyle, setInteractionStyle] = useState('clicking');
    const [animationsOn, setAnimationsOn] = useState(false);
    const [showPossibleMovesOn, setShowPossibleMovesOn] = useState(true);
    const [musicOn, setMusicOn] = useState(false);

    const [showToast, createToast] = useToasts();


    useEffect(() => {  
        Object.values(toasts).forEach(toastName => {
            createToast(toastName, {
                title: toastTitle,
            });
        })
    }, [])
    



    const handleInteractionStyle = (style) => {
        if (interactionStyle === style) return;
        setInteractionStyle(style);
    }

    function   OptionWrapper ({
        title, 
        children, 
        ...props
    }) {
        return (
            <section 
            {...props}
            className="d-flex flex-column justify-content-center mb-4 bg-primary border-maroon py-3 px-5 "
            >
            <span 
            className="text-center text-light mb-3">
                {title}
            </span>
                {children}
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



    
    function ToastInfo ({
        variable, 
        prelude, 
        textOn, 
        textOff,
        withoutStyling
    }) {
        return (
                 <span>
                 {prelude} 
                 {
                 variable 
                 ? 
                 <strong className={`${!withoutStyling && `text-danger`}`}>
                   {" "}  {textOff}
                 </strong> 
                 : 
                 <strong className={`${!withoutStyling && `text-success`}`}>
                    {" "}   {textOn}
                 </strong>
                 }
                 </span> 
        )
     }


    function InteractionStyle ({interactionStyleName, interactionTitle, gif, alt}) {
        return (
           
            <div>
        <h6 className="text-light text-center text-uppercase">{interactionTitle}</h6>
        <Image  
           className={`cursor-pointer p-1 ${interactionStyle === interactionStyleName ? "bg-success" : ""}`}
        onClick={() => {
            showToast(toasts.interaction, 
                <ToastInfo 
                    variable={interactionStyle === 'clicking'}
                    prelude="Aktualny sposób przemieszczania figur to "
                    textOn="klikanie na pola"
                    textOff="przeciąganie figur"
                    withoutStyling
                    />
                )
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
                showToast(toasts.animation, 
                    <ToastInfo 
                    variable={animationsOn}
                    prelude="Animacje są"
                    textOn="włączone"
                    textOff="wyłączone"
                    />
                    )
                setAnimationsOn(prev => !prev)
            } }
           />
           <Option 
            title="Pokazywanie możliwych posunięć"
            aria-label="Przełączanie pokazywania możliwych posunięć"
            isOn={showPossibleMovesOn}
            onToggle={() =>  {
                showToast(toasts.possibleMoves, 
                    <ToastInfo 
                    variable={showPossibleMovesOn}
                    prelude="Pokazywanie potencjalnych ruchów figur jest"
                    textOn="włączone"
                    textOff="wyłączone"
                    />
                    )
                setShowPossibleMovesOn(prev => !prev)}}
           />
           <Option 
            title="Muzyka"
            aria-label="Przełączanie muzyki"
            isOn={musicOn}
            onToggle={() => {
                showToast(toasts.music, 
                    <ToastInfo 
                    variable={musicOn}
                    prelude="Muzyka jest"
                    textOn="włączona"
                    textOff="wyłączona"
                    />
                    )
                setMusicOn(prev => !prev)
            }}
           />
            <OptionWrapper
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
        <Button>
           Zamknij opcje 
        </Button>
        </Modal.Footer>
      </Modal>
    )
}
