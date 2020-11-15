import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BlackBackground from 'assets/black-bg.jpg';
import Image from 'react-bootstrap/Image';
import {templateChanged, selectActiveGameTemplate, selectTemplates} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';

export default function GameTemplatesSetter() {

  const dispatch = useDispatch();
  const activeGameTemplate = useSelector(selectActiveGameTemplate);
  const templates = useSelector(selectTemplates);

  const handleChangingGameTemplate = (isActive, tempName) => {
    if(isActive) return;
    dispatch(templateChanged(tempName))
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
<Carousel className="mx-auto w-50">
<div>Coś jest</div>
{templates &&
  Object.entries(templates).map(([tempName, {meta: {longTitle}}]) => {
    let text, variant;
    const isActive = tempName === activeGameTemplate
    if(isActive) {
      text = "Aktualnie wybrany";
      variant = "success"
    } else {
      text = 'Wybierz';
      variant = undefined;
    }
    return (
      <Carousel.Item key={tempName} interval={8000}>
        <SlideBackground/>
        <Carousel.Caption>
         <h3>{longTitle}</h3>
         <Button 
         variant={variant}
         onClick={() => handleChangingGameTemplate(isActive, tempName)}
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

    
    )
  



  }


