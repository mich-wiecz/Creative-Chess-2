import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import classes from './PlaygroundBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt, faChessKnight, faGamepad, faPalette, faPlusSquare, faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';

import {AdditionalOptions} from '@playground/AdditionalOptions/index'

const TabIcon = ({icon}) =>  <FontAwesomeIcon icon={icon} style={{fontSize: 28}} size="lg"/>



const TabItem = ({showAllTabs, text, icon, eventKey, disabled = false}) => {

  return (
<OverlayTrigger
    show={showAllTabs}
    placement={'right'}
    delay={{hide: 8000}}
    overlay={
      <Popover id={`tooltip-${eventKey}`}>
        <Popover.Content>
    <span>
    {text}
  </span>
      </Popover.Content>
      </Popover>
    }
  >
  <Nav.Item className="py-2">
  <Nav.Link eventKey={eventKey} disabled={disabled}>
<TabIcon icon={icon}/>
</Nav.Link>
  </Nav.Item>
</OverlayTrigger>
  )
}


export default function PlaygroundBar() {


    const [showAllTabs, setShowingAllTabs] = useState(false);


    return (
      <Tab.Container style={{backgroundColor: 'red'}} id="playground-tabs" defaultActiveKey="help">
      <Row>
        <Col 
        xs={1} 
        >
          <Nav variant="pills" 
          className={`flex-column ${classes.Standard}  ${showAllTabs && classes.Show}`}
          onMouseEnter={() => setShowingAllTabs(true)}
          onMouseLeave={() => setShowingAllTabs(false)}
          >
          <TabItem 
          show={showAllTabs}
          text={'Dodaj pola'} 
          icon={faPlusSquare} 
          eventKey={'poles-adding'}/>
          <TabItem 
           show={showAllTabs}
          text={'Zmień rozmiar pól'} 
          icon={faArrowsAlt} 
          eventKey={'poles-resizing'}/>
          <TabItem 
           show={showAllTabs}
          text={'Dodaj figury'} 
          icon={faChessKnight} 
          eventKey={'figures-adding'}
          disabled
          />
          <TabItem 
           show={showAllTabs}
          text={'Zmień tryb i czas'} 
          icon={faGamepad} 
          eventKey={'modes'}/>
          <TabItem 
           show={showAllTabs}
          text={'Motyw szachownicy'} 
          icon={faPalette} 
          eventKey={'color-motive'}/>
          <TabItem 
           show={showAllTabs}
          text={'Dodatkowe'} 
          icon={faStar} 
          eventKey={'additional'}/>
          <TabItem 
           show={showAllTabs}
          text={'Pomoc'} 
          icon={faQuestionCircle} 
          eventKey={'help'}/>
          </Nav>
        </Col>
      </Row>
      <Row className={`${classes.Displayer} bg-primary text-secondary`}>
        <Col>
        <Tab.Content>
        <Tab.Pane eventKey="poles-adding">
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quisquam pariatur placeat consectetur accusantium praesentium corrupti voluptatem architecto eum tenetur sit quo ipsa aliquid provident quia, officia illum cum quas.
              </Tab.Pane>
              <Tab.Pane eventKey="help">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, dignissimos. Vitae commodi ut ullam asperiores assumenda repellendus, corrupti nobis aliquam repellat soluta quasi autem. Quis cum illo error est cupiditate?
              </Tab.Pane>
              <Tab.Pane eventKey="additional">
              <AdditionalOptions />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
    </Tab.Container>
    )
}