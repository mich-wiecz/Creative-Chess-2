import React, {forwardRef} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import {useTranslation} from 'contexts/TranslationProvider'


const myMotivation = {
    pl: {
        0: "Pełna niezależność finansowa.",
        1: "Tworzenie czegoś potrzebnego, ciekawego.",
        2: "Chcę, żeby praca była dla mnie wyzwaniem. Kiedy pracowałem w innych miejscach, cały czas miałem poczucie, że mogę więcej. Chciałbym ciągle iść do przodu i być mistrzem w tym, co robię.",
        3: "Mam bardzo żywą wyobraźnię, masę pomysłów i mam nadzieję, że programowanie pozwoli mi je realizować.",
        4: "Wydaje mi się, że mam w tym potencjał, że moja osobowość i zdolności pasują do tej pracy. Chcę dzięki temu wytworzyć dużo wartości dla siebie i innych.",
        5: "Lubię pracować w pełnym skupieniu na zadaniu.",
        6: "Podoba mi się społeczność programistów, ludzie, którzy są zorientowani na tworzenie.",
        7: "Programowanie jest dla mnie bardzo wciągające, daje mi satysfakcję, ciekawi mnie samo w sobie."
    },
    en: {
        0: "Full financial independence.",
        1: "Creating something useful, interesting.",
        2: "I want the job to be a challenge for me.  When I worked in other places, I had the feeling that I could do more. I would love to keep moving forward and be a master at what I do.",
        3: "I have a very vivid imagination, a lot of ideas and I hope that programming will allow me to realized them.",
        4: "It seems to me that I have the potential, that my personality and abilities fit this job. I want to create a lot of value for myself and others from this.",
        5: "I like to work fully focused on the task.",
        6: "I like the developers community, people who are creation oriented.",
        7: "I find programming very addictive, it gives me satisfaction, it interests me in itself."
    }
}


const  MyMotivation = forwardRef((_props, ref) => {


    const getTranslation = useTranslation()


    return (
<Card id="motivation" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
     {
         getTranslation({
             pl: "Moja motywacja",
             en: "My motivation"
         })
     }
     </Card.Title>
     </Card.Header>
 <Card.Body className="m-xs-0 m-md-3">
<ListGroup>
 {
     Object.values(
         getTranslation(myMotivation)
     )
     .map((motivation, index) => {
         return (
             <ListGroupItem
             key={index}
             >
                 {motivation}
             </ListGroupItem>
         )
     })
 }
</ListGroup>
</Card.Body>

</Card>

    )
})


export default MyMotivation;