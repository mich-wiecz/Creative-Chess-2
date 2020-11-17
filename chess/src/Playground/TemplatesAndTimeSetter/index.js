import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TimeSetter from './TimeSetter';
import GameTemplatesSetter from './GameTemplatesSetter';
export default function TemplatesAndTimeSetter() {


    return (
      <>
        <Tabs 
        defaultActiveKey="templates-setter" 
        id="templates-and-time-setter" 
        className="playground-tabs"  
        > 
        <Tab eventKey="templates-setter" title="Wybierz tryb">
        <GameTemplatesSetter />
        </Tab>
        <Tab eventKey="time-setter" title="Ustaw czas" >
          <TimeSetter />
        </Tab>
      </Tabs>
      </>
    
    )
  



  }


