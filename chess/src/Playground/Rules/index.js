import React from 'react';
import {rulesUrls} from 'data.json';



function IframeComponent ({onClick, mode, title})  {
  return (
<div
  style={{
    position: 'relative',
    width: '100%',
    height: '100%',
  }}
  >
    {/* <FontAwesomeIcon 
    icon={faRedo}
    color="blue"
    size="2x"
    className="bg-maroon p-1"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      cursor: 'pointer'
    }}
    /> */}
    <iframe 
      id="rules-iframe"
    style={{
      width: '100%',
      height: '100%',
    }}
    src={rulesUrls[mode]} 
    title={title}
    />
    </div>
  )
  
  }


export default function Rules({mode}) {

  const setModeTitle = () => {
    switch(mode) {
      case '960': return 'Zasady gry w szachy losowe (960)'
      case 'capablanca': return 'Zasady gry w capablanki'
      default: return 'Zasady gry w szachy klasyczne'
    }
  }




  return <IframeComponent 
  title={setModeTitle()}
  mode={mode}

   />;
}
