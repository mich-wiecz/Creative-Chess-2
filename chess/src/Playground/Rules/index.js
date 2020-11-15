import React, {useState} from 'react';
import {rulesUrls} from 'data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';



export default function Rules({mode}) {

  const [refreshToken, setRefreshToken] = useState(0);

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
      className="bg-dark p-1"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
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
      title="Zasady gry w szachy klasyczne"
      />
      </div>
  )


   if (refreshToken === 0) return <IframeComponent />;
   if (refreshToken === 1) {
     setRefreshToken(0);
     
   }
}
