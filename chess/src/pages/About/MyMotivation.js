import React, {forwardRef} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';



const myMotivation = {
   0: "Pełna niezależność finansowa.",
   1: "Tworzenie czegoś nowego, ciekawego.",
   2: "Chcę, żeby praca była dla mnie wyzwaniem, kiedy pracowałem w innych miejscach cały czas miałem poczucie, że mogę więcej. Chciałbym ciągle iść do przodu i być mistrzem w tym co robię.",
   3: "Mam bardzo żywą wyobraźnie, masę pomysłów i mam nadzieję, że programowanie pozwoli mi je realizować.",
   4: "Wydaje mi się, że mam w tym potencjał, że moja osobowość i zdolności pasują do tej pracy. Chcę dzięki temu wytworzyć dużo wartości dla siebie i innych.",
   5: "Lubię pracować w pełnym skupieniu na zadaniu, \"odcięty\" od reszty otoczenia.",
   6: "Bardzo podoba mi się społeczność programistów, ludzie, którzy są zorientowani na tworzenie.",
   7: "Programowanie jest dla mnie bardzo wciągające, daje mi satysfakcję, ciekawi mnie samo w sobie."
}


const  MyMotivation = forwardRef((_props, ref) => {


    return (
<Card id="motivation" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
     Moja motywacja
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-3">
<ListGroup>
 {
     Object.values(myMotivation)
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