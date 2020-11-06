import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {ResizableBox} from 'react-resizable';
import 'react-resizable/css/styles.css'
import classes from './PlaygroundBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt, faChessKnight, faGamepad, faPalette, faPlusSquare, faMousePointer, faStar, faGripVertical } from '@fortawesome/free-solid-svg-icons';

import {AdditionalOptions} from '@playground/AdditionalOptions';
import Help from '@playground/Help';
import ColorMotivePanel from '@playground/ColorMotivePanel';
import ModesAndTimeSetter from '@playground/ModesAndTimeSetter';
import BoardFieldResizer from '@playground/BoardFieldResizer';


const TabIcon = ({icon}) =>  <FontAwesomeIcon icon={icon} style={{fontSize: 28}} size="lg"/>



export default function PlaygroundBar() {


    const [showAllTabs, setShowingAllTabs] = useState(false);
    const [activeKey, setActiveKey] = useState('');

    function TabItem({ text, icon, eventKey, disabled = false }) {

      return (
        <OverlayTrigger
          show={showAllTabs}
          placement={'right'}
          overlay={<Popover id={`tooltip-${eventKey}`}>
            <Popover.Content>
              <span>
                {text}
              </span>
            </Popover.Content>
          </Popover>}
        >
          <Nav.Item className="py-2">
            <Nav.Link eventKey={eventKey} disabled={disabled}>
              <TabIcon icon={icon} />
            </Nav.Link>
          </Nav.Item>
        </OverlayTrigger>
      );
    }

    return (
      <Tab.Container  id="playground-tabs">
      <Row >
        <Col 
        className="mt-5 ml-2  rounded"
        xs={1} 
        >
          <Nav variant="pills" 
          className={`flex-column text-center ${classes.Standard}  ${showAllTabs && classes.Show}`}
          onMouseEnter={() => setShowingAllTabs(true)}
          onMouseLeave={() => setShowingAllTabs(false)}
          >
          <TabItem 
          text={'Dodaj pola'} 
          icon={faPlusSquare} 
          eventKey={'poles-adding'}/>
          <TabItem 
           
          text={'Zmień rozmiar pól'} 
          icon={faArrowsAlt} 
          eventKey={'poles-resizing'}/>
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
          eventKey={'color-motive'}/>
          <TabItem 
           
          text={'Dodatkowe'} 
          icon={faStar} 
          eventKey={'additional'}/>
          <TabItem 
           
          text={'Interakcje z szachownicą'} 
          icon={faMousePointer} 
          eventKey={'interaction-table'}/>
          </Nav>
        </Col>
      </Row>
      <ResizableBox
          className={`react-resizable bg-primary text-light ${classes.Displayer}  p-4  overflow-auto rounded border-maroon`}
          style={{width: 1000}}
      handle={ (h) => 
      <div
        className={`react-resizable-handle react-resizable-handle-${h}`}
        style={{
          // transformOrigin: 'bottom',
          // transform: 'scale(3)',
          width: 60,
          height: 60
        }}
        />
      }
      resizeHandles={[ 'se']}
      axis="y"
      minConstraints={[860, 200]}
      maxConstraints={[860, 800]}
      width={860}
      height={400}
      >
        <Tab.Content >
        <Tab.Pane eventKey="modes">
          <ModesAndTimeSetter/>
              </Tab.Pane>
              <Tab.Pane eventKey="interaction-table">
               <Help />
              </Tab.Pane>
              <Tab.Pane eventKey="additional">
              <AdditionalOptions />
              </Tab.Pane>
              <Tab.Pane eventKey="color-motive">
              <ColorMotivePanel />
              </Tab.Pane>
              <Tab.Pane eventKey="poles-resizing">
              <BoardFieldResizer />
              </Tab.Pane>
             
            </Tab.Content>
        </ResizableBox>
    </Tab.Container>
    )
}
