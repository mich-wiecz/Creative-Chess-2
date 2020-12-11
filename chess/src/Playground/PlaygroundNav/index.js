import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faChessKnight, faGamepad, faPalette, faPlusSquare, faMousePointer, faStar, faBook, faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';



const TabIcon = ({icon}) =>  <FontAwesomeIcon icon={icon} style={{fontSize: 28}} size="lg"/>




export default function PlaygroundNav({
  isGameOn,
  showAllPopovers,
  handleShowAllPopovers,
  mobileVersion
}) {





  function TabItem({ text, icon, eventKey, disabled = isGameOn }) {

    return (
      <OverlayTrigger
        show={showAllPopovers}
        placement={'right'}
        overlay={
        <Popover id={`tooltip-${eventKey}`}>
          <Popover.Content style={{zIndex: 2350}}>
            <span >
              {text}
            </span>
          </Popover.Content>
        </Popover>
        }
      >
        <Tabs.Item 
        style={mobileVersion ?  {
          width:  "20%", 
          paddingTop: 10, 
          paddingBottom: 10
        } : {}}
        className=" text-center flex-grow-0"
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
    xs={12}
    md={12} 
    className="d-flex flex-column justify-content-center position-relative"
    style={!mobileVersion ? {
      minHeight: 500,
      maxHeight: 1000
    } : {marginTop: 15}}
    >
          
          <OverlayTrigger
        show={true}
        placement={'top'}
        overlay={
          !mobileVersion 
          ?
          <Popover id={`toggle-all-popovers`}>
          <Popover.Content 
          className="text-center cursor-pointer"
          style={{
            zIndex: 2350,  
          width: 100
          }}
          onClick={() => handleShowAllPopovers(!showAllPopovers)
          }
          >
            <span 
            className="text-uppercase d-flex justify-content-between align-items-center"
            >
              Pomoc
              <FontAwesomeIcon 
              icon={showAllPopovers ? faCheck : faInfo}
              color={showAllPopovers ? "green": ""}
              size="lg"
              />
            </span>
          </Popover.Content>
        </Popover>
          :
          // React Fragment will not work
          <span />
        }
      >
      <Tabs variant="pills" 
      style={{zIndex: 9400, minWidth: 50}}
      className={`w-100 ${mobileVersion ? "h-100" : "h-75"} flex-md-column justify-content-around rounded bg-maroon flex-xs-wrap flex-md-nowrap `}
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
      eventKey={'interaction-table'}
      disabled
      />
       <TabItem 
      text={'Dodatkowe'} 
      icon={faStar} 
      eventKey={'additional'}
      disabled={false}
      />
     
      </Tabs>
      </OverlayTrigger>
    </Col>
  </Row>
  )
}


