import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TimeSetter from './TimeSetter';
import TemplatesSetter from './TemplatesSetter';
export default function ModesAndTimeSetter() {


    return (
      <>
        <Tabs 
        defaultActiveKey="templates-setter" 
        id="templates-and-time-setter" 
        className="playground-tabs"  
        > 
        <Tab eventKey="templates-setter" title="Wybierz tryb">
        <TemplatesSetter />
        </Tab>
        <Tab eventKey="time-setter" title="Ustaw czas" >
          <TimeSetter />
        </Tab>
      </Tabs>
      </>
    
    )
  



  }


