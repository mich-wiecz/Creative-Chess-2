
 import React, {forwardRef} from 'react';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Card from 'react-bootstrap/Card';
 import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import range from '@global-functions/range';
import {plHardSkills, enHardSkills} from './hardSkills';
import {plSoftSkills, enSoftSkills } from './softSkills'
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import {useTranslation} from 'contexts/TranslationProvider';



  function SkillRate({
      prepend,
      skill,
      rate,
      darker,
      isMain
  }) {
      return (
        <ListGroup.Item 
        className={`mx-0 ${darker ? "evenRate" : ""} rounded`}
        style={isMain ? {backgroundColor: 'antiqueWhite'} : {}}
        >
           
            <Row className=" justify-content-center">
                {
                    prepend &&
                    <Col xs={2}>
                    {prepend}
                    </Col>
                }
               
            <Col xs="9" md="4" className="ml-2">
            <span>
                {skill}
            </span>
            </Col>
            
            <Col 
            xs={8}  
            md={4} 
            lg={3} 
            style={{maxWidth: 170}} 
            className={`d-flex justify-content-around align-items-center mt-3 mt-md-0 `}>
           {
               range(0, 6).map(item => {
                   const colorObj = item < rate ? {color: 'green'} : {}; 
                  return (
                    <FontAwesomeIcon 
                       key={item}
                   icon={faCircle}
                   {...colorObj}
                   />
                  ) 
               })
           }
            </Col>
            
        </Row>
       
     </ListGroup.Item>
      )
  }


  function SkillsRatesGroup({
      darker,
      category,
      skillsRates
  }) {

    const {rest: restRate, note, ...otherRates} = skillsRates;
   return (
    <ListGroup.Item>
        <section>
            <ListGroup  variant="flush">
        <SkillRate 
            skill={category}
            rate={restRate}
            darker={darker}
            isMain={true}
            />
            </ListGroup>
            <ListGroup className="ml-md-5" variant="flush">
            {
                Object.entries(otherRates)
                .sort((a, b) => {
                    let aValue = a[1],
                    bValue = b[1];

                    if (aValue > bValue) return -1;
                    if (aValue < bValue) return 1;
                    return 0
                })
                .map(([skill, rate], index) => {
                    const isEven = (index + 1) % 2 === 0;
                    return (
                        <>
                       
                        <SkillRate 
                        prepend={
                            <FontAwesomeIcon 
                            icon={faArrowRight}
                            />
                        }
                        key={skill}
                        skill={skill}
                        rate={rate}
                        darker={isEven}
                        isGrouped={true}
                        />
                        </>
                    )
                })
            }
                   {
                note &&
            <Col xs={12} >
                <p className="p-3">
               {note}
                </p>
            </Col>
            }
            </ListGroup>
        </section>
</ListGroup.Item>
   )
  }



  function renderSkillRates (skills) {

   let count = 0;

    return Object.entries(skills)
    .sort((a, b) => {
        let aValue = a[1],
        bValue = b[1];

        
        aValue = typeof aValue === 'number' ? aValue : aValue.rest;
        bValue = typeof bValue === 'number' ? bValue : bValue.rest;

        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0
    })
    .map(([skill, value], index) => {
        if (typeof value === 'number') {
            count++;
         return (
             <SkillRate 
             key={index}
             skill={skill}
             rate={value}
             darker={(count) % 2 === 0}
             />
         )
        }
         count++;
        return (
            <SkillsRatesGroup 
            category={skill}
            skillsRates={value}
            darker={(count) % 2 === 0}
            />
        )
       
    })
 }




 
 export  const HardSkills = forwardRef((_props, ref) => {


    const getTranslation = useTranslation();


    return (

<Card id="hardSkills" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
     {
         getTranslation({
             pl: "Umiejętności twarde",
             en: "Hard skills"
         })
     }
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-md-3">

 <Card.Text>
     <Col 
className=" rounded p-4 mx-auto"
style={{
    backgroundColor: '#b5a448'
}}
xs={12}
md={10}
lg={9}
>
    {
        getTranslation({
            pl: (
                <>
                    <h5>
        Większość narzędzi jakiej się przez moją naukę nauczyłem, wraz z moimi subiektywnymi ocenami.
    </h5>
    <p>
        Poniżej dzielę się kilkoma uwagami, w jaki sposób chciałbym, aby rozumiano poniższe ocenianie.
    </p>
    <ListGroup>
        <ListGroupItem>
         Przede wszystkim, oceny są całkowicie <strong>subiektywne</strong> i oznaczają jak pewnie i sprawnie czuję się i poruszam w pracy z danym narzędziem.
        </ListGroupItem>
        <ListGroupItem>
        <strong>1</strong> zielona kropka, oznacza, że rozumiem, po co oraz jak ogólnie działa dane narzędzie. Miałem z tym także trochę praktycznej styczności, ale tylko trochę.
        </ListGroupItem>
        <ListGroupItem>
        <strong>3</strong> zielone kropki, oznaczają że czuję się pewnie. Jestem w stanie sporo zrobić z pamięci. W większości przypadków potrafię się "bawić" narzędziem, czyli próbować rzeczy, które wykraczają poza dokumentację czy kurs.
        </ListGroupItem>
        <ListGroupItem>
        <strong>6</strong> zielonych kropek, oznacza że czuję się bardzo pewnie (chociaż z pewnością jest wiele rzeczy, których nie wiem).
        </ListGroupItem>
        <ListGroupItem className="text-muted mt-4">
       PS Zagnieżdżone elementy nie tyle chcę przedstawić jako elementy całości ale jako <strong>całkowicie wyodrębnione</strong>. Czyli oceniając CSS na <strong>6</strong> mam na myśli "standardowe" elementy tego języka, a oddzielnie traktuję flexbox, grid itd. 
        </ListGroupItem>
    </ListGroup>
                </>
            ),
    en: (
        <>
            <h5>
            Most of the tools I have learned through my study, along with my subjective assessments.
    </h5>
    <p>
    Below I am sharing a few comments on how I would like the following rates to be understood.
    </p>
    <ListGroup>
        <ListGroupItem>
        The assessments are completely <strong> subjective </strong>, and they indicate how confident and efficient I am when working with a given tool.
        </ListGroupItem>
        <ListGroupItem>
        <strong> 1 </strong> green circle means that I understand what the tool is for and how it works in general. I also had some practical contact with it, but only a little.
        </ListGroupItem>
        <ListGroupItem>
        <strong> 3 </strong> green circles mean I feel confident. I can do a lot from memory. In most cases, I am able to "play" with the tool which means trying things that go beyond the documentation or course.
        </ListGroupItem>
        <ListGroupItem>
        <strong> 6 </strong> green circles mean I feel very confident (although there are certainly many things I don't know).
        </ListGroupItem>
        <ListGroupItem className="text-muted mt-4">
        PS I do not want to present nested elements as part of the whole but rather as completely extracted. So I have rated CSS as <strong> 6 </strong> and this refers to "standard" elements of this language, and separately I treat flexbox, grid etc.
        </ListGroupItem>
    </ListGroup>
        </>
    )
        })
    }

</Col>
   </Card.Text>

  <ListGroup variant="flush">
   {renderSkillRates(getTranslation({pl: plHardSkills, en: enHardSkills}))}
  </ListGroup>
  </Card.Body>
</Card>

    )
})



export  const SoftSkills = forwardRef((_props, ref) => {

    const getTranslation = useTranslation();

    return (

<Card id="softSkills" ref={ref} className="mb-5">
 <Card.Header >
     <Card.Title className="text-center">
     {
         getTranslation({
             pl: "Umiejętności miękkie",
             en: "Soft skills"
         })
     }
     </Card.Title>
     </Card.Header>
     <Card.Text>
     <article 
className=" rounded p-4"
style={{
    backgroundColor: '#b5a448',
    margin: '3% 5% 3% 5%'
}}
>
    {
        getTranslation({
            pl: (
                <>
             <h5>
    Moje umiejętności miękkie, cechy charakteru, które uważam, że mogą się przydać w pracy programisty.
    </h5>
    <p>
       Głównie oceniam tutaj jak dużo mam doświadczenia i jak bardzo mogę polegać na danej umiejętności. Innymi słowy, na ile wiem, że potrafię być w tym skuteczny (i jestem).
    </p>
                </>
            ),
        en: (
            <>
             <h5>
             My soft skills and personality traits that I think can come in handy as a programmer.
    </h5>
    <p>
    I mainly judge here how much experience I have and how much I can rely on a given skill. In other words, how much I know I can be effective at given skill (and I am).
    </p>
                </>
        )
        })
    }
   
</article>
   </Card.Text>
 <Card.Body className="m-3">
  <ListGroup variant="flush">
   {renderSkillRates(getTranslation({pl: plSoftSkills, en: enSoftSkills}))}
  </ListGroup>
  </Card.Body>
</Card>

    )
})
 