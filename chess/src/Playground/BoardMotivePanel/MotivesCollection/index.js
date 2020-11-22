import React, {useState, useRef} from 'react';
import ColorMotive from '../BoardMotive'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import UserOptions from '@global-components/UserOptions';
import wait from '@global-functions/wait';

export default function MotivesCollection({
    areTheSameMotive,
    defaultMotives,
    userMotives,
    deleteUserMotive,
    prepareNewMotive,
    changeActiveMotive,
    activeMotive,
    isEnoughUserMoves
}) {


    const [showModal, setShowingModal] = useState(false);
    const [selectedMotive, setSelectedMotive] = useState(null);
    const [isSelectedMotiveFromUser, setIsSelectedMotiveFromUser] = useState(false);
    const preventSingleClick = useRef(false);



    const handleShowModal = () => {
        setShowingModal(true);
    }

    const handleCloseModal = () => {
        preventSingleClick.current = false;
        setShowingModal(false)
    }

    const handleClickOnMotive = (motive) => {
        wait(150)
        .then(() => {
            if(preventSingleClick.current)  return;
            changeActiveMotive(motive)
        })
    }


    const handleDoubleClickOnMotive = (motive, isUserMotive) => {
        preventSingleClick.current = true;
        handleShowModal();
        setIsSelectedMotiveFromUser(isUserMotive);
        setSelectedMotive(motive);
    }

    const handleDeleteMotive = (selectedMotive) => {
        deleteUserMotive(selectedMotive);
    }


    const handlePrepareNewMotive = (selectedMotive) => {
        prepareNewMotive(selectedMotive)
    }



    function renderMotives (motivesArray, isUserMotive) {
        isUserMotive = isUserMotive === 'user-motive';
       return motivesArray.map(motive => {
        const id = motive.first + motive.second;
        return (
            <Col 
            key={id} 
            className="d-flex justify-content-center mb-4 "
            style={{
                flexBasis: '20%'
            }}
            >
            <ColorMotive 
            id={id}
            isUserMotive={isUserMotive }
            isActive={areTheSameMotive(activeMotive, motive)}
            colors={motive} 
            onClick={() => handleClickOnMotive(motive)}
            onDoubleClick={() => handleDoubleClickOnMotive(motive, isUserMotive)}
            />
            </Col>
        )
       
    })
    }


    function OptionButton({ children, onClick, ...props }) {
        return (
            <Button {...props} variant="myblue" className="w-100" onClick={() => {
                if (onClick) onClick();
                setShowingModal(false);
            } }>
                {children}
            </Button>
        );
    }

    return (
        <>
    <Container className="text-center">
        <h6 className=" mt-3">Domyślne motywy</h6>
        <Row className="mt-4 justify-content-start align-items-start"> 
            {
                renderMotives(defaultMotives)
            }
        </Row>
        <div className="border-bottom my-2  text-light"/>
        <section>
        <h6 >Motywy użytkownika</h6>
        <span className="text-muted d-block">( max 10 )</span>
        <span className="text-muted d-block">( kliknij 2-krotnie w motyw, aby wyświetlić opcje )</span>
        </section>
        <Row className="mt-4 justify-content-start align-items-start"> 
        {
        renderMotives(userMotives, 'user-motive')
        }
        </Row>
    </Container>


    <UserOptions.Modal
        show={showModal}
        onHide={handleCloseModal}
        title="Co chcesz zrobić z tym motywem?"
        >
            
                {
                    isSelectedMotiveFromUser && 
                    <UserOptions.Option>
                       <OptionButton onClick={() => handleDeleteMotive(selectedMotive)}>Usuń go</OptionButton>
                    </UserOptions.Option>

                }
            <UserOptions.Option>
            <OptionButton>Nie rób nic</OptionButton>
            </UserOptions.Option>
            <UserOptions.Option>
            <OptionButton 
            disabled={isEnoughUserMoves}
            onClick={ () => handlePrepareNewMotive(selectedMotive)}
            >Dodaj kolejny bazując na tym</OptionButton>
            </UserOptions.Option>
            </UserOptions.Modal>
</>
  
    )
}
