import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faChessKnight, faGamepad, faPalette, faPlusSquare, faMousePointer, faStar, faBook } from '@fortawesome/free-solid-svg-icons';



const TabIcon = ({icon}) =>  <FontAwesomeIcon icon={icon} style={{fontSize: 28}} size="lg"/>




export default function PlaygroundNav({
  isGameOn,
  showAllTabs,
  handleShowAllTabs,
  mobileVersion
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
        <Tabs.Item 
        style={mobileVersion ?  {width:  120} : {}}
        className=" py-2 text-center flex-grow-1"
        >
          <Tabs.Link 
          className=" px-0" 
          eventKey={eventKey} 
          disabled={disabled}
          >
            <TabIcon icon={icon} />
          </Tabs.Link>
        </Tabs.Item>
      </OverlayTrigger>
    );
  }





  return (
    <Row >
    <Col 
    className="mt-5"
    xs={12}
    md={1} 
    >
      <Tabs variant="pills" 
      style={{zIndex: 9400, minWidth: 40}}
      className={`w-100  flex-md-column justify-content-start rounded bg-maroon flex-xs-wrap flex-md-nowrap `}
      onMouseEnter={() => handleShowAllTabs(!showAllTabs)}
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
      disabled={false}
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
      text={'Motyw szachownicy'} 
      icon={faPalette} 
      eventKey={'board-motive'}
      disabled={false}
      />
            <TabItem 
      text={'Interakcje z szachownicą'} 
      icon={faMousePointer} 
      eventKey={'interaction-table'}/>
       <TabItem 
      text={'Dodatkowe'} 
      icon={faStar} 
      eventKey={'additional'}
      disabled={false}
      />
     
      </Tabs>
    </Col>
  </Row>
  )
}
