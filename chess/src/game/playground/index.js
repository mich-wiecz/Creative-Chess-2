import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import PlaygroundBar from './PlaygroundBar'
import {AdditionalOptions} from '@playground/AdditionalOptions';
import InteractionsDescription from '@playground/InteractionsDescription';
import ColorMotivePanel from '@playground/ColorMotivePanel';
import ModesAndTimeSetter from '@playground/ModesAndTimeSetter';
import BoardFieldResizer from '@playground/BoardFieldResizer';
import Rules from './Rules';
import Displayer from './Displayer';
import PlaygroundNav from './PlaygroundNav';




export default function Playground({
  isGameOn
}) {


    const [showAllTabs, setShowAllTabs] = useState(false);
    const [activeKey, setActiveKey] = useState(null);

    return (
      <>
      {
        !isGameOn &&
        <PlaygroundBar />
      }
     
      <Tab.Container id="playground-tabs">
     <PlaygroundNav 
     isGameOn={isGameOn}
      activeKey={activeKey}
      showAllTabs={showAllTabs}
      handleShowAllTabs={setShowAllTabs}
      handleSetActiveKey={setActiveKey}
     />
     
      <Displayer
      show={!!activeKey}
  >
     <Tab.Content className="h-100">
           <Tab.Pane className="h-100" eventKey="game-rules">
           <Rules mode="classic"/>
          </Tab.Pane>
          <Tab.Pane eventKey="modes">
            <ModesAndTimeSetter/>
          </Tab.Pane>
          <Tab.Pane eventKey="interaction-table">
           <InteractionsDescription />
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
    </Displayer>
    </Tab.Container>
    </>
    )
}
