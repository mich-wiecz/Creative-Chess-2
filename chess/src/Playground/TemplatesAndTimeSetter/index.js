import React, {useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TimeSetter from './TimeSetter';
import GameTemplatesSetter from './GameTemplatesSetter';


export default function TemplatesAndTimeSetter() {

  const [activeKey, setActiveKey] = useState('templates-setter')

   useEffect(() => {
    const savedActiveKey = sessionStorage.getItem('tatKey');
    if (savedActiveKey && activeKey !== savedActiveKey) {
      setActiveKey(savedActiveKey)
    }
   }, [activeKey])

    return (
    
        <Tabs 
        activeKey={activeKey}
        onSelect={k => {
          setActiveKey(k);
          sessionStorage.setItem('tatKey', k);
        }}
        id="templates-and-time-setter" 
        className="playground-tabs"  
        > 
        <Tab eventKey="templates-setter" 
        className="mt-2" title="Wybierz tryb">
        <GameTemplatesSetter />
        </Tab>
        <Tab 
        eventKey="time-setter" 
        title="Ustaw czas" 
        >
          <TimeSetter />
        </Tab>
      </Tabs>
    
    )
  



  }


