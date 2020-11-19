import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {templateChanged, selectActiveGameTemplate, selectTemplates} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';
import classic from 'assets/board-screenshots/classic.png';
import capablanca from 'assets/board-screenshots/capablanca.png';
import random960 from 'assets/board-screenshots/960.png';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {rulesUrls} from 'data.json';
import TemplatesMenu from './TemplatesMenu'
import BoardsSlides from './BoardsSlides'



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





function RulesButton({activeImage}) {
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



export default function GameTemplatesSetter({showToast}) {


  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useDispatch();
  const activeGameTemplate = useSelector(selectActiveGameTemplate);
  const templates = useSelector(selectTemplates);

  const handleChangingGameTemplate = (isActive, tempName) => {
    if(isActive) return;
    dispatch(templateChanged(tempName))
  }


    return (  
<Container>
  <Tab.Container 
  id="game-templates-tabs"
  >
    <Row>
  <TemplatesMenu 
  activeImage={activeImage}
  setActiveImage={setActiveImage}
  activeGameTemplate={activeGameTemplate}
  templatesOrder={templatesOrder}
  templatesToShow={templatesToShow}
  />
    <BoardsSlides 
     activeImage={activeImage}
     setActiveImage={setActiveImage}
     templatesOrder={templatesOrder}
     activeGameTemplate={activeGameTemplate}
     templatesToShow={templatesToShow}
     templates={templates}
     showToast={showToast}
     handleChangingGameTemplate={handleChangingGameTemplate}
    />  
<RulesButton activeImage={activeImage}/>
</Row>

</Tab.Container>
</Container>

    
    )
  



  }


