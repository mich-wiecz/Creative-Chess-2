import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faChessKnight, faGamepad, faPalette, faPlusSquare, faMousePointer, faStar, faBook } from '@fortawesome/free-solid-svg-icons';



const TabIcon = ({icon}) =>  <FontAwesomeIcon icon={icon} style={{fontSize: 28}} size="lg"/>




export default function PlaygroundNav({
  isGameOn,
  activeKey,
  showAllTabs,
  handleShowAllTabs,
  handleSetActiveKey,
}) {





  function TabItem({ text, icon, eventKey, disabled = isGameOn }) {

    return (
      <OverlayTrigger
        show={showAllTabs}
        placement={'right'}
        overlay={<Popover id={`tooltip-${eventKey}`}>
          <Popover.Content style={{zIndex: 2350}}>
            <span >
              {text}
            </span>
          </Popover.Content>
        </Popover>}
      >
        <Nav.Item 

        className=" py-2 text-center"
        onClick={() => {
          handleSetActiveKey(activeKey === eventKey ?  null : eventKey);
        }}
        >
          <Nav.Link className=" px-0" eventKey={eventKey} disabled={disabled}>
            <TabIcon icon={icon} />
          </Nav.Link>
        </Nav.Item>
      </OverlayTrigger>
    );
  }





  return (
    <Row >
    <Col 
    className="mt-5"
    xs={1} 
    >
      <Nav variant="pills" 
      style={{zIndex: 1400, minWidth: 40}}
      className={`w-100 flex-column rounded bg-maroon`}
      onMouseEnter={() => handleShowAllTabs(true)}
      onMouseLeave={() => handleShowAllTabs(false)}
      >
        <TabItem 
        text="Zasady gry"
        icon={faBook}
        eventKey="game-rules"
        disabled={false}
        />
      <TabItem 
      text={'Dodaj pola'} 
      icon={faPlusSquare} 
      eventKey={'poles-adding'}
      disabled
      />
      <TabItem 
      text={'Zmień rozmiar pól'} 
      icon={faArrowsAlt} 
      eventKey={'poles-resizing'}
      />
      <TabItem 
      text={'Dodaj figury'} 
      icon={faChessKnight} 
      eventKey={'figures-adding'}
      disabled
      />
      <TabItem 
       
      text={'Zmień tryb i czas'} 
      icon={faGamepad} 
      eventKey={'modes'}/>
      <TabItem 
      text={'Motyw kolorystyczny'} 
      icon={faPalette} 
      eventKey={'color-motive'}
      disabled={false}
      />
            <TabItem 
      text={'Interakcje z szachownicą'} 
      icon={faMousePointer} 
      eventKey={'interaction-table'}/>
       <TabItem 
      text={'Dodatkowe'} 
      icon={faStar} 
      eventKey={'additional'}/>
      </Nav>
    </Col>
  </Row>
  )
}
