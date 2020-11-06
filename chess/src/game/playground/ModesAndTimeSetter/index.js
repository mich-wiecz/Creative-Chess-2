import React, {useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BlackBackground from 'assets/black-bg.jpg';
import Image from 'react-bootstrap/Image';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import Container from 'react-bootstrap/Container';

export default function ModesAndTimeSetter() {

  const [activeMode, setActiveMode] = useState('classic');


  const handleSettingActiveMode = (modeId) => {
    if(modeId === activeMode) return;
    setActiveMode(modeId)
  }


  function SlideBackground ({...props}) {
    return   <Image
    rounded
    width={200}
    height={300}
    className="d-block w-100 mt-4"
    src={BlackBackground}
    alt="black background"
    {...props}
  />
  }

  function RulesButton() {
    return (
      <Button>
      Zobacz zasady
    </Button>
    )
  }

    return (
      <>
        <Tabs 
        defaultActiveKey="modes-setter" 
        id="modes-and-time-setter" 
        className="playground-tabs"  
        > 
        <Tab eventKey="modes-setter" title="Wybierz tryb">
        
      <Carousel className="mx-auto w-50">

{
  [
    {
      title: "Szachy klasyczne", 
      modeId: "classic"
    },
    {
      title: "Capablanki", 
      modeId: "capablanca"
    },
    {
      title: "Szachy 960 (losowe)", 
      modeId: "960"
    },
  ].map(mode => {
    let text, variant;
    if(mode.modeId === activeMode) {
      text = "Aktualnie wybrany";
      variant = "success"
    } else {
      text = 'Wybierz';
      variant = undefined;
    }
    return (
      <Carousel.Item interval={8000}>
        <SlideBackground/>
        <Carousel.Caption>
         <h3>{mode.title}</h3>
         <Button 
         variant={variant}
         onClick={() => handleSettingActiveMode(mode.modeId)}
         className="mx-3"
         >
          {text}
          </Button>
        <RulesButton/>
        </Carousel.Caption>
      </Carousel.Item>
    )
  })
}
</Carousel>

        </Tab>
        <Tab eventKey="time-setter" title="Ustaw czas" >
          <Container className="mt-5 d-flex flex-column align-items-center ">
          <h6>
            Kliknij w piona, by wyłączyć czas w grze
          </h6>
          <PawnSwitch />
        <FormControl 
        className="mt-5 w-25"
        type="number"
        placeholder="0 - 60 min"
        aria-label="Set game time"
        min="0"
        max="60"
        />
         </Container>
        </Tab>
      </Tabs>
   

</>
    
    )}
