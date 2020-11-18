import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import {templateChanged, selectActiveGameTemplate, selectTemplates} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';
import classic from 'assets/board-screenshots/classic.png';
import capablanca from 'assets/board-screenshots/capablanca.png';
import random960 from 'assets/board-screenshots/960.png';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {rulesUrls} from 'data.json';



const templatesToShow = {
  classic: {
    board: classic,
    title: "Szachy klasyczne"
  },
  capablanca: {
    board: capablanca,
    title: "Capablanki"
  },
  960: {
    board: random960,
    title: "960 (szachy losowe)"
  }
}

const templatesOrder = ['classic', '960', 'capablanca'];

const boardSide = 250;

export default function GameTemplatesSetter() {


  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useDispatch();
  const activeGameTemplate = useSelector(selectActiveGameTemplate);
  const templates = useSelector(selectTemplates);

  const handleChangingGameTemplate = (isActive, tempName) => {
    if(isActive) return;
    dispatch(templateChanged(tempName))
  }


  function SlideBackground ( {tempName, image, ...props}) {
    return   <Image
    rounded
    width={tempName === 'capablanca' ? boardSide * 1.25 : boardSide}
    height={boardSide}
    className="d-block mt-4 mx-auto"
    src={image}
    alt="zdjęcie szachownicy"
    {...props}
  />
  }

  function RulesButton() {
    return (
      <Button 
      as="a" 
      href={rulesUrls[templatesOrder[activeImage]]}
      target="_blanc"
      >
      Zobacz zasady
    </Button>
    )
  }


    return (  
<Container>
  <Tab.Container 
  id="game-templates-tabs"
  >
    <Row>
      <Col xs={12} md={4}>
    <Nav 
     defaultActiveKey={0}
     activeKey={activeImage}
     onSelect={(key) => {
       setActiveImage(Number(key))
     } }
    variant="pills" 
    className="flex-column w-100 h-100 justify-content-center rounded ">
    {
      templatesOrder.map((tempName, index) => {
        const {title} = templatesToShow[tempName];
        return (
     <Nav.Item  className="my-1">
  <Nav.Link 
  eventKey={index} 
  title={tempName} 
  className={`text-light  ${activeImage === index ? "bg-secondary" : "bg-maroon"}`}
  >
    {title}
  </Nav.Link>
  </Nav.Item>
        )
      })
    }
</Nav>

</Col>
<Col xs={12} md={8}>
<Carousel 
activeIndex={activeImage}
onSelect={(index) => {
  setActiveImage(index)
} }
indicators={false} 
>
{
  templatesOrder.map((tempName) => {
    let text, variant;
    const isActive = tempName === activeGameTemplate
    if(isActive) {
      text = "Aktualnie wybrany";
      variant = "success"
    } else {
      text = 'Wybierz';
      variant = undefined;
    }

    const isTemplate = templates.hasOwnProperty(tempName);
    return (
      <Carousel.Item 
      interval={10000}
      key={tempName} 
      >
        <div className="d-flex flex-column justify-content-center" style={{height: `${boardSide}`}}>
        <SlideBackground
        image={templatesToShow[tempName].board}
        tempName={tempName}
        />
        <Carousel.Caption>
         <Button 
         variant={variant}
         disabled={!isTemplate}
         onClick={() => handleChangingGameTemplate(isActive, tempName)}
         className="mx-3"
         style={{
           transform: `translateY(-${boardSide / 3.5}px)`,
           width: 200
        }}
         >
          {isTemplate ? text : "Niedostępny"} 
          </Button>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
    )
  })
}
</Carousel>
</Col>
<RulesButton />
</Row>

</Tab.Container>
</Container>

    
    )
  



  }


