import React, {useState, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import PlaygroundBar from './PlaygroundBar'
import AdditionalOptions from './AdditionalOptions';
import InteractionsDescription from './InteractionsDescription';
import BoardMotivePanel from './BoardMotivePanel';
import TemplatesAndTimeSetter from './TemplatesAndTimeSetter';
import BoardFieldResizer from './BoardFieldResizer';
import Rules from './Rules';
import Displayer from './Displayer';
import PlaygroundNav from './PlaygroundNav';
import windowDimensions from 'react-window-dimensions';

import {useSelector} from 'react-redux';
import {selectActiveGameTemplate} from 'redux/chessSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';


const widthBreakpoint = 768;




function TabPane ({children, eventKey, className, ...props}) {
  return (
    <Tab.Pane 
    className={`${className}`} 
    eventKey={eventKey}
    {...props}
    >
    {children}
   </Tab.Pane>
  )
}



function PlaygroundSwitch({onClick}) {
  return (
    <FontAwesomeIcon 
    icon={faPuzzlePiece}
    size="4x"
    className="text-primary bg-maroon p-2"
    style={{
      position: 'absolute',
      top: "25%",
      left: 0,
      cursor: 'pointer',
      borderRadius: '0 30px 30px 0',
      zIndex: 4500
    }}
    onClick={onClick}
    />
  )
}


 

 function Playground({
   windowWidth,
  isGameOn,
  children: Board
}) {


   const isMobileVersion = windowWidth < widthBreakpoint;


    const [showAllTabs, setShowAllTabs] = useState(false);
    const [activeKey, setActiveKey] = useState(null);


  const handleSetActiveKey = (key) => {
    if (key === activeKey) {
      setActiveKey(null);
    }  else {
      setActiveKey(key)
    }

    }


    useEffect(() => {
      if (isGameOn) {
        setActiveKey('');
      }
    }, [isGameOn])

    const activeTemplate = useSelector(selectActiveGameTemplate);

    function renderPlaygroundNav () {
      return (
        <PlaygroundNav 
        mobileVersion={isMobileVersion}
        isGameOn={isGameOn}
         showAllTabs={showAllTabs}
         handleShowAllTabs={setShowAllTabs}
        />
      )
    }


    function renderDisplayer () {
      return (
        <Displayer
        width={windowWidth < 1000 ? 0.8 * windowWidth : 0.6 * windowWidth}
        show={activeKey}
        mobileVersion={isMobileVersion}
        onClose={() => setActiveKey(null)}
    >
       <Tab.Content className="h-100">
             <TabPane eventKey="game-rules" className="h-100">
             <Rules mode={activeTemplate}/>
            </TabPane>
            <TabPane eventKey="modes">
              <TemplatesAndTimeSetter/>
            </TabPane>
            <TabPane eventKey="interaction-table">
             <InteractionsDescription />
            </TabPane>
            <TabPane eventKey="additional">
            <AdditionalOptions />
            </TabPane>
            <TabPane eventKey="board-motive">
            <BoardMotivePanel />
            </TabPane>
            <TabPane eventKey="poles-resizing">
            <BoardFieldResizer />
            </TabPane>
            </Tab.Content>
      </Displayer>
      )
    }

function PlaygroundForSmallDevices() {
  return (
    <div 
    style={{
      position: 'absolute',
      width: '100%',
      height: '80%',
      zIndex: 5000
    }}
    className="d-flex flex-column"
    >
      {renderPlaygroundNav()}
      {renderDisplayer()}
    </div>
  )
}


function MainPartContainer({displayer, nav}) {
  return (
    <main
    className="d-flex justify-content-between"
   >
{nav}
 <section 
 style={{
 minHeight: '90vh',
 position: 'relative'
 }}
className={`p-5 mx-auto flex-grow-1 d-flex flex-column justify-content-center align-items-center`}
> 
  {displayer}   
<div 
style={{
 marginTop: activeKey ? '200px' : 0
}}
>
 
{Board}
</div>
</section>
</main>
  )
}


function renderForMobile() {
  return (
    <>
    {
      activeKey
      ?
      <PlaygroundForSmallDevices />
     :
     <PlaygroundSwitch onClick={() => setActiveKey('board-motive')}/>
    }
   <MainPartContainer />
</>
  )
}


function renderNormally() {
  return (
   <MainPartContainer 
   nav={renderPlaygroundNav()} 
   displayer={renderDisplayer()} 
   />
  )
}


return (
  <>
  {
    !isGameOn && <PlaygroundBar />
  }
 
  <Tab.Container 
  style={{position: 'relative'}}
  onSelect={(key) => handleSetActiveKey(key)} 
  activeKey={activeKey} id="playground-tabs"
  >
 {
   isMobileVersion 
   ?
   renderForMobile()
   :
   renderNormally()
 }
</Tab.Container>
</>
)
}



export default windowDimensions({
  take: () => ({windowWidth: window.innerWidth}),
  // debounce: onResize => debounce(onResize, 200)
})(Playground);