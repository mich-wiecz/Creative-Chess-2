import React, {useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TimeSetter from './TimeSetter';
import GameTemplatesSetter from './GameTemplatesSetter';
import {useToasts} from 'contexts/ToastProvider';



export default function TemplatesAndTimeSetter() {


   const [showToast, createToast] = useToasts();


   useEffect(() => {
    createToast('template');
    createToast('time');
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

    return (
      <>
        <Tabs 
        defaultActiveKey="templates-setter" 
        id="templates-and-time-setter" 
        className="playground-tabs"  
        > 
        <Tab eventKey="templates-setter" 
        className="mt-2" title="Wybierz tryb">
        <GameTemplatesSetter 
        showToast={(text) => showToast('template', text)}
        />
        </Tab>
        <Tab eventKey="time-setter" title="Ustaw czas" >
          <TimeSetter 
          showToast={(text) => showToast('time', text)}
          />
        </Tab>
      </Tabs>
      </>
    
    )
  



  }


