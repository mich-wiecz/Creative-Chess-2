import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BlackBackground from 'assets/black-bg.jpg';
import Image from 'react-bootstrap/Image';
import {templateChanged, selectActiveGameTemplate, selectTemplates} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';
import classic from 'assets/board-screenshots/classic.png';
import capablanca from 'assets/board-screenshots/capablanca.png';
import random960 from 'assets/board-screenshots/960.png';



const boardScreenshots = {
  classic,
  capablanca,
  960: random960
}

const boardSide = 300;

export default function GameTemplatesSetter() {

  const dispatch = useDispatch();
  const activeGameTemplate = useSelector(selectActiveGameTemplate);
  const templates = useSelector(selectTemplates);

  const handleChangingGameTemplate = (isActive, tempName) => {
    if(isActive) return;
    dispatch(templateChanged(tempName))
  }


  function SlideBackground ( {templateName, ...props}) {
    return   <Image
    rounded
    width={boardSide}
    height={boardSide}
    className="d-block w-100 mt-4"
    src={boardScreenshots[templateName]}
    alt="zdjęcie szachownicy"
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
<Carousel indicators={false} className="mt-3 mx-auto w-50 ">
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

    const splittedTitle = longTitle.split(' ')

    return (
      <Carousel.Item 
      key={tempName} 
      interval={8000}

      >
        <div className="d-flex flex-column justify-content-center" style={{height: '400px'}}>
        <SlideBackground
        templateName={tempName}
        />
        <Carousel.Caption>
         <h3
         style={{
           textAlign: 'left',
           position: 'absolute',
           width: `${boardSide}px`,
           transform: `translateY(-${boardSide + 10}px`,

         }}
         >{`${splittedTitle[0]} ${splittedTitle[1] ? splittedTitle[1] : ''}`}
         </h3>
         <Button 
         variant={variant}
         onClick={() => handleChangingGameTemplate(isActive, tempName)}
         className="mx-3"
         style={{
           transform: `translateY(-${boardSide / 2.5}px)`,
           width: 200
        }}
         >
          {text}
          </Button>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
    )
  })
}
</Carousel>

    
    )
  



  }


