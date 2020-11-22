import React, {useState, useRef, useEffect} from 'react';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import Prelude from './Prelude';
import {HardSkills, SoftSkills} from './SkillRates'
import MyMotivation from './MyMotivation';
import Bio from './Bio';
import ChessHistory from './ChessHistory';
import End from './End';
import {Link, Element} from 'react-scroll';
import windowDimensions from 'react-window-dimensions';
import debounce from 'lodash.debounce';
import {Navigation, TableOfContent} from './Links';
import {generateDots} from './generateDots';



 
 function MotivationalList({windowHeight}) {

    const [loaded, setLoaded] = useState(false);
    const container = useRef(null);
    const prelude = useRef(null);
    const hardSkills = useRef(null);
    const softSkills = useRef(null);
    const motivation = useRef(null);
    const bio = useRef(null);
    const history = useRef(null);


    useEffect(() => {
     setLoaded(true)
    }, [loaded])


     return (
<>
 <Container 
fluid
className="d-flex w-100 justify-content-center  my-3  px-4 "
style={{
    fontSize: '1.1rem'
}}
> 

<Row className="justify-content-center mb-3"
         style={{
            transform: 'translateX(calc(-0/12 * 100%))'
        }}
>
<Col  lg={3} xl={2} className="p-0 mr-2  d-none d-lg-flex">
<Navigation 
loaded={loaded}
container={container}
sections={[prelude, hardSkills, softSkills, motivation, bio, history]}
windowHeight={windowHeight}
/>
</Col>
<Col 
id="container"
ref={container}
         sm={12}
         md={10}
         lg={10}
         xl={8}
         className=" d-inline-block bg-secondary rounded border border-dark"
         style={{
            maxHeight: "93vh",
            overflowY: 'scroll',
            // overflowX: 'hidden',
            zIndex: 2000,
            // maxWidth: 1200
        }}
         >
  
<Element name="prelude">
<Prelude ref={prelude}/>
</Element>
<div className="d-flex flex-column justify-content-center align-items-center  mb-5"> 
<h4 className="text-light display-6" 
        style={{
            transform: 'translateY(420%)'
        }}
        >
            Co mam do zaoferowania?
        </h4>  
{generateDots(10)}
</div>
<TableOfContent />
   <Element name="hardSkills">
<HardSkills ref={hardSkills}/>
</Element>
<Element name="softSkills">
<SoftSkills ref={softSkills}/>
</Element>
<Element name="motivation">
<MyMotivation ref={motivation}/>
</Element>
<Element name="bio">
<Bio ref={bio}/>
</Element>
<Element name="history">
<ChessHistory ref={history}/>
</Element>
<End>
<Button style={{
                backgroundColor: '#b5a448',
            }} className="w-100 h-100 m-0">
        <Link 
        className="w-100 h-100 d-block"
        to={"prelude"}
        spy={true}
        smooth={true}
        duration={300}  
        containerId="container" 
        >
     Dane kontaktowe
        </Link>
        </Button>
</End>

<Col xs={12} className="d-flex justify-content-center">
<FontAwesomeIcon 
icon={faSmile}
size={'10x'}
className="text-light"
/>
</Col>
</Col>
</Row>


</Container>
</>

     )
 }
 

 export default  windowDimensions({
  take: () => ({windowHeight: window.innerHeight}),
  debounce: onResize => debounce(onResize, 200)
})(MotivationalList);
