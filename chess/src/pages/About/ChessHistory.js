import React, {forwardRef} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';



const ChessHistory = forwardRef((_props, ref) => {


    return (
<Card id="history" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
     Historia strony
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-3">
    <Card.Text>
 Jak najbardziej mogą Państwo jeszcze nie wiedzieć, że ta strona to gra szachowa. Chciałbym opowiedzieć krótko jak była tworzona oraz jakich najważniejszych narzędzi użyłem w praktyce.
 </Card.Text>

 <ListGroupItem>
 Zacznę od tego, że jest to aktualnie trzecia wersja tej aplikacji. 
 Pierwsza miała być tylko mini-projektem i tworzyłem ją w czystym JavaScript, CSS a sama szachownica  i wszelkie z nią interakcje opierały się na HTML Canvas. Użyłem również Anime.js w paru miejscach.
</ListGroupItem>

<ListGroupItem>
Druga była mocno zbliżona do tej, która można zobaczyć obecnie. Użyłem React (bez hook-sów), SCSS, Formik, Typescript. Była to wersja bardziej oryginalna, ponieważ sam tworzyłem wszystkie komponenty, style, było trochę HOC-sów, sam stworzyłem historię czy scroll w szachowym motywie.
</ListGroupItem>

<ListGroupItem>
Ostateczna wersja powstała, ponieważ chciałem spróbować takich narzędzi jak  React Hooks, Bootstrap, Redux, Immer czy Jest wraz z React-testing-library. Ostatecznie zrezygnowałem z dwóch ostatnich, ponieważ zależało mi, aby skończyć tą stronę jak najszybciej (jest bardzo dużo do nauczenia się poza tym). Niemniej, przerobiłem całą dokumentację Jest i przetestowałem kilkanaście funkcji w tym projekcie. 
Również użyłem Formik oraz SCSS (w małym stopniu).
Zrezygnowałem tym razem z Typescript.
</ListGroupItem>


</Card.Body>

</Card>


    )
})

export default ChessHistory;