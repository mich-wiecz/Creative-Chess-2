import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import PlaygroundBar from './PlaygroundBar'
import AdditionalOptions from './AdditionalOptions';
import InteractionsDescription from './InteractionsDescription';
import ColorMotivePanel from './ColorMotivePanel';
import TemplatesAndTimeSetter from './TemplatesAndTimeSetter';
import BoardFieldResizer from './BoardFieldResizer';
import Rules from './Rules';
import Displayer from './Displayer';
import PlaygroundNav from './PlaygroundNav';





export default function Playground({
  isGameOn,
  children: Board
}) {

    const [showAllTabs, setShowAllTabs] = useState(false);
    const [activeKey, setActiveKey] = useState(null);

    return (
      <>
      {
        !isGameOn && <PlaygroundBar />
      }
     
      <Tab.Container id="playground-tabs">
        <main
         className="d-flex justify-content-between"
        >
     <PlaygroundNav 
     isGameOn={isGameOn}
      activeKey={activeKey}
      showAllTabs={showAllTabs}
      handleShowAllTabs={setShowAllTabs}
      handleSetActiveKey={setActiveKey}
     />
      <section 
      style={{
        minHeight: '90vh',
        position: 'relative'
      }}
      className={`p-5 mx-auto flex-grow-1 d-flex flex-column justify-content-center align-items-center`}
      >
      <Displayer
      show={!!activeKey}
  >
     <Tab.Content className="h-100">
           <Tab.Pane className="h-100" eventKey="game-rules">
           <Rules mode="classic"/>
          </Tab.Pane>
          <Tab.Pane eventKey="modes">
            <TemplatesAndTimeSetter/>
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
    <div 
    style={{
      marginTop: !!activeKey ? '200px' : 0
    }}
    >
    {Board}
    </div>
    </section>
    </main>
    </Tab.Container>
    </>
    )
}
