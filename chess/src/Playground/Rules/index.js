import React, {useState} from 'react';
import {rulesUrls} from 'data.json';
import Spinner from 'react-bootstrap/Spinner';



export default function Rules({mode}) {


  const [loading, setLoading] = useState(true)

  const setModeTitle = () => {
    switch(mode) {
      case '960': return 'Zasady gry w szachy losowe (960)'
      case 'capablanca': return 'Zasady gry w capablanki'
      default: return 'Zasady gry w szachy klasyczne'
    }
  }


  return <div
  style={{
    position: 'relative',
    width: '100%',
    height: '100%',
  }}
  >
    {
      loading &&
      <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      className="flex justify-content-center align-items-center"
      >
    <Spinner 
    role="status"
    animation="border"
    aria-hidden="true"
    style={{
      width: 100,
      height: 100
    }}
    />
    </div>
    }
    
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
    onLoad={() => setLoading(false)}
      id="rules-iframe"
    style={{
      width: '100%',
      height: '100%',
    }}
    src={rulesUrls[mode]} 
    title={setModeTitle()}
    alt={"Zasady gry w szachy"}
    />
    </div>
}
