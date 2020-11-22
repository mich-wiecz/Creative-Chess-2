
 import React, {forwardRef} from 'react';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Card from 'react-bootstrap/Card';
 import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import range from '@global-functions/range';
import {hardSkills} from './hardSkills';
import { softSkills } from './softSkills'
import ListGroupItem from 'react-bootstrap/ListGroupItem';


  function SkillRate({
      prepend,
      skill,
      rate,
      darker,
  }) {
      return (
        <ListGroup.Item 
        className={`mx-0 ${darker ? "evenRate" : ""}`}
        >
           
            <Row >
                {
                    prepend &&
                    <Col xs={2}>
                    {prepend}
                    </Col>
                }
               
            <Col xs="5" md="4" >
            <span>
                {skill}
            </span>
            </Col>
            
            <Col xs={3}  md={5} lg={3} style={{width: 20}} className="d-flex justify-content-around align-items-center">
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
    console.log(darker)
   return (
    <ListGroup.Item>
        <section>
            <ListGroup  variant="flush">
        <SkillRate 
            skill={category}
            rate={restRate}
            darker={darker}
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


    return (

<Card id="hardSkills" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
     Umiejętności twarde
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-md-3">

 <Card.Text>
     <article 
className=" rounded p-4"
style={{
    backgroundColor: '#b5a448',
    margin: '3% 5% 3% 5%'
}}
>
    <h5>
        Większość narzędzi jakiej się przez moją naukę nauczyłem, wraz z moimi subiektywnymi ocenami.
    </h5>
    <p>
        Chciałbym podzielić się kilkoma uwagami, w jaki sposób chciałbym, aby rozumiano poniższe ocenianie.
    </p>
    <ListGroup>
        <ListGroupItem>
         Oceny są całkowicie <strong>subiektywne</strong> i oznaczają jak pewnie i sprawnie czuję się i poruszam w pracy z danym narzędziem.
        </ListGroupItem>
        <ListGroupItem>
        <strong>1</strong>, oznacza, że rozumiem, po co oraz jak ogólnie działa dane narzędzie, miałem z tym także trochę praktycznej styczności, ale tylko trochę.
        </ListGroupItem>
        <ListGroupItem>
        <strong>3</strong>, oznacza, czuję się pewnie, jestem w stanie sporo zrobić z pamięci. W większości przypadków jestem w stanie się "bawić" narzędziem, czyli próbować rzeczy, które wykraczają poza dokumentację czy kurs.
        </ListGroupItem>
        <ListGroupItem>
        <strong>6</strong>, oznacza, że czuję się bardzo pewnie, (chociaż z pewnością jest wiele rzeczy, których nie wiem).
        </ListGroupItem>
        <ListGroupItem className="text-muted mt-4">
       Zagnieżdżone elementy nie tyle chcę przedstawić jako elementy całości ale jako całkowite wyodrębnione. Czyli oceniając CSS na <strong>6</strong> mam na myśli "standardowe" elementy tego języka, a oddzielnie traktuję flexbox, grid itd. 
        </ListGroupItem>
    </ListGroup>
</article>
   </Card.Text>

  <ListGroup variant="flush">
   {renderSkillRates(hardSkills)}
  </ListGroup>
  </Card.Body>
</Card>

    )
})



export  const SoftSkills = forwardRef((_props, ref) => {

    return (

<Card id="softSkills" ref={ref} className="mb-5">
 <Card.Header >
     <Card.Title className="text-center">
     Umiejętności miękkie
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
    <h5>
    Moje umiejętności miękkie, cechy charakteru, które uważam, że mogą się przydać w pracy programisty.
    </h5>
    <p>
       Głównie oceniam tutaj jak dużo mam doświadczenia i jak bardzo mogę polegać na danej umiejętności. Innymi słowy, na ile wiem, że potrafię być w tym skuteczny (i jestem).
    </p>
</article>
   </Card.Text>
 <Card.Body className="m-3">
  <ListGroup variant="flush">
   {renderSkillRates(softSkills)}
  </ListGroup>
  </Card.Body>
</Card>

    )
})
 