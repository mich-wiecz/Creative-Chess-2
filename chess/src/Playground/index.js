import React, {useState, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import AdditionalOptions from './AdditionalOptions';
import InteractionsDescription from './InteractionsDescription';
import BoardMotivePanel from './BoardMotivePanel';
import TemplatesAndTimeSetter from './TemplatesAndTimeSetter';
import BoardFieldResizer from './BoardFieldResizer';
import Rules from './Rules';
import Displayer from './Displayer';
import PlaygroundNav from './PlaygroundNav';

import {useSelector} from 'react-redux';
import {selectActiveGameTemplate, selectTime} from 'redux/chessSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';




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
    className="text-primary bg-maroon p-2 pl-4"
    style={{
      position: 'absolute',
      top: "5%",
      left: 0,
      transform: 'translateX(-100%)',
      cursor: 'pointer',
      borderRadius: '30px 0 0 30px',
      zIndex: 500
    }}
    onClick={onClick}
    />
  )
}


 

 function Playground({
   mobileVersion,
   windowWidth,
   isMobilePlaygroundOn,
   setIsMobilePlaygroundOn,
  isGameOn,
  children: Board
}) {



    const [showAllPopovers, setShowAllPopovers] = useState(false);
    const [activeKey, setActiveKey] = useState(null);

    const activeTemplate = useSelector(selectActiveGameTemplate);
    const {isTimeGame} = useSelector(selectTime);


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
    }, [isGameOn]);



    useEffect(() => {
      if (!mobileVersion) {
        if (isMobilePlaygroundOn) {
          setIsMobilePlaygroundOn(true)
        }
        return;
      }
      if (activeKey && !isMobilePlaygroundOn) {
        setIsMobilePlaygroundOn(true)
      }
      if (!activeKey && isMobilePlaygroundOn) {
        setIsMobilePlaygroundOn(false)
      }

    }, [activeKey, isMobilePlaygroundOn, mobileVersion, setIsMobilePlaygroundOn])


    function renderPlaygroundNav () {
      return (
        <PlaygroundNav 
        mobileVersion={mobileVersion}
        isGameOn={isGameOn}
         showAllPopovers={showAllPopovers}
         handleShowAllPopovers={setShowAllPopovers}
        />
      )
    }


    function renderDisplayer () {
      return (
        <Displayer
        width={windowWidth < 1000 ? 0.8 * windowWidth : 0.6 * windowWidth}
        show={activeKey}
        mobileVersion={mobileVersion}
        onClose={() => {
          setActiveKey(null)
        } }
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


function MainPartContainer({displayer: Displayer, nav: Nav, switch: Switch}) {
  return (
    <main
    className="d-flex justify-content-between"
   >
{Nav}
 <section 
 style={{
 minHeight: '90vh',
 maxWidth: '90vw',
 position: 'relative'
 }}
className={`p-5 mx-auto flex-grow-1 d-flex flex-column justify-content-center align-items-center`}
> 
  {Displayer}   
  <div
  className="position-relative"
  style={isTimeGame ?  {marginTop: 100} : {}}
  >
{Switch}
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
      <>
      <PlaygroundForSmallDevices />
      <MainPartContainer />
      </>
     :
     <>
     <MainPartContainer 
     switch={
      <PlaygroundSwitch 
      onClick={() => {
        setActiveKey('board-motive')
      } }
      />
     }
     />
      </>
    }
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
 
  <Tab.Container 
  style={{position: 'relative', maxWidth: '100vw'}}
  onSelect={(key) => handleSetActiveKey(key)} 
  activeKey={activeKey} id="playground-tabs"
  >
 {
   mobileVersion 
   ?
   renderForMobile()
   :
   renderNormally()
 }
</Tab.Container>
</>
)
}



export default Playground;