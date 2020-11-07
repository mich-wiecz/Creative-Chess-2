import React, {useState, useRef} from 'react';
import ColorMotive from '../ColorMotive'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import MotivesAdder from '../MotivesAdder';
import Button from 'react-bootstrap/Button';
import UserOptions from '@global-components/UserOptionsModal';
import wait from '@global-functions/wait';

export default function MotivesCollection({
    defaultMotives,
    userMotives,
    addUserMotive,
    deleteUserMotive,
    changeActiveMotive,
    activeMotive,

}) {


    const [showModal, setShowingModal] = useState(false);
    const [colorsOfSelectedMotive, setColorsOfSelectedMotive] = useState(null);
    const preventSingleClick = useRef(false);



    const handleShowModal = () => {
        setShowingModal(true);
    }

    const handleCloseModal = () => {
        preventSingleClick.current = false;
        setShowingModal(false)
    }

    const handleClickOnMotive = (id) => {
        wait(200)
        .then(() => {
            if(preventSingleClick.current)  return;
            changeActiveMotive(id)
        })
    }


    const handleDoubleClickOnMotive = (colorsObject) => {
        preventSingleClick.current = true;
        handleShowModal();
        setColorsOfSelectedMotive(colorsObject);
    }

    const handleDeleteMotive = () => {
        deleteUserMotive(colorsOfSelectedMotive);
    }


    function renderMotives (motivesArray, isUserMotive) {
       return motivesArray.map(motive => {
        const id = motive.first + motive.second;
        return (
            <Col key={id} className="d-flex justify-content-center">
            <ColorMotive 
            id={id}
            isUserMotive={isUserMotive === 'user-motive' ? true  : false }
            isActive={activeMotive === id}
            colors={motive} 
            onClick={handleClickOnMotive}
            onDoubleClick={handleDoubleClickOnMotive}
            />
            </Col>
        )
       
    })
    }


    function OptionButton({ children, onClick, ...props }) {
        return (
            <Button {...props} variant="secondary" onClick={() => {
                if (onClick) onClick();
                setShowingModal(false);
            } }>
                {children}
            </Button>
        );
    }

    return (
        <>
    <Container>
        <Row className="mt-4"> 
            {
                renderMotives(defaultMotives)
            }
        </Row>
        <div className="border-bottom my-5  text-light"/>

        <Row className="mt-4"> 
        {
        renderMotives(userMotives, 'user-motives')
        }
        { 
        addUserMotive && (
        <Col className="d-flex justify-content-center">
        <MotivesAdder/>
        </Col>
        )}
        </Row>
    </Container>


    <UserOptions.Modal
        show={showModal}
        onHide={handleCloseModal}
        title="Co chcesz zrobić z tym motywem?"
        >
            <UserOptions.Option>
            <OptionButton onClick={handleDeleteMotive}>Usuń go</OptionButton>
            </UserOptions.Option>
            <UserOptions.Option>
            <OptionButton>Nie rób nic</OptionButton>
            </UserOptions.Option>
            <UserOptions.Option>
            <OptionButton>Dodaj kolejny bazując na tym</OptionButton>
            </UserOptions.Option>
            </UserOptions.Modal>
</>
  
    )
}
