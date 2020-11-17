import React, {useState} from 'react';
import {rulesUrls} from 'data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';



export default function Rules({mode}) {

  const [refreshToken, setRefreshToken] = useState(0);

  const setModeTitle = () => {
    switch(mode) {
      case '960': return 'Zasady gry w szachy losowe (960)'
      case 'capablanca': return 'Zasady gry w capablanki'
      default: return 'Zasady gry w szachy klasyczne'
    }
  }

  const IframeComponent = () => (
    <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
    }}
    >
      <FontAwesomeIcon 
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
      onClick={() => {
        setRefreshToken(1)
      } }
      />
      <iframe 
        id="rules-iframe"
      style={{
        width: '100%',
        height: '100%',
      }}
      src={rulesUrls[mode]} 
      title={setModeTitle()}
      />
      </div>
  )


   if (refreshToken === 0) return <IframeComponent />;
   if (refreshToken === 1) {
     setRefreshToken(0);
     
   }
}
