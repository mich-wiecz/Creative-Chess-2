import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {templateChanged, selectActiveGameTemplate, selectTemplates, templateAdded} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';
import classic from 'assets/board-screenshots/classic.png';
import capablanca from 'assets/board-screenshots/capablanca.png';
import random960 from 'assets/board-screenshots/960.png';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {rulesUrls} from 'data.json';
import TemplatesMenu from './TemplatesMenu'
import BoardsSlides from './BoardsSlides';
import {random960GameTemplate} from 'chess/templates/defaultTemplates';
import store from 'redux/store';



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





function RulesButton({activeImage, style}) {
  return (
    <Button 
    style={style}
    as="a" 
    href={rulesUrls[templatesOrder[activeImage]]}
    target="_blanc"
    >
    Zobacz zasady
  </Button>
  )
}

const boardSide = 250;


export default function GameTemplatesSetter() {


  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useDispatch();
  const activeGameTemplate = useSelector(selectActiveGameTemplate);
  const templates = useSelector(selectTemplates);

  const handleChangingGameTemplate = (tempName) => {
    if (tempName === '960') {
      dispatch(templateAdded(store.getState().chess, ...random960GameTemplate ))
    } else {
      dispatch(templateChanged(tempName))
    }
    
  }


    return (  
<Container >
  <Tab.Container 
  id="game-templates-tabs"
  >
    <Row className="justify-content-around position-relative">
      <Col 
      xs={7} 
      md={5}
      lg={4}
      xl={4}
      className="mt-3 mt-md-0"
      >
  <TemplatesMenu 
  activeImage={activeImage}
  setActiveImage={setActiveImage}
  activeGameTemplate={activeGameTemplate}
  templatesOrder={templatesOrder}
  templatesToShow={templatesToShow}
  />
  </Col>
  <Col 
  style={{
    maxWidth: boardSide * 1.5
  }}
  >
    <BoardsSlides 
    boardSide={boardSide}
     activeImage={activeImage}
     setActiveImage={setActiveImage}
     templatesOrder={templatesOrder}
     activeGameTemplate={activeGameTemplate}
     templatesToShow={templatesToShow}
     templates={templates}
     handleChangingGameTemplate={handleChangingGameTemplate}
    />  
    </Col>
    <RulesButton 
  activeImage={activeImage}
  style={{
    position: 'absolute',
    bottom: '-15%',
    left: '0%'
  }}
  />
    </Row>
</Tab.Container>
</Container>

    
    )
  



  }


