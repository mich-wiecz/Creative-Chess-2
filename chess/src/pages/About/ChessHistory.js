import React, {forwardRef} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import {useTranslation} from 'contexts/TranslationProvider';


const ChessHistory = forwardRef((_props, ref) => {

    
const getTranslation = useTranslation();

    return (
<Card id="history" ref={ref} className="mb-5">
    {
        getTranslation({
            pl: (
                <>
                <Card.Header>
     <Card.Title className="text-center">
     Historia strony
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-3">
    <Card.Text>
  Mogą Państwo jeszcze nie wiedzieć, że ta strona to gra szachowa. Chciałbym opowiedzieć krótko, jak ją stworzyłem oraz jakich najważniejszych narzędzi użyłem w praktyce.
 </Card.Text>

 <ListGroupItem>
 Zacznę od tego, że jest to aktualnie trzecia wersja tej aplikacji. 
 Pierwsza miała być tylko mini-projektem i tworzyłem ją w czystym JavaScript, CSS. Sama szachownica  i wszelkie z nią interakcje opierały się na HTML Canvas. Użyłem również animacji Anime.js w paru miejscach.
</ListGroupItem>

<ListGroupItem>
Druga była mocno zbliżona do tej, która można zobaczyć obecnie. Użyłem React (bez hook-sów), SCSS, Formik, Typescript. Była to wersja bardziej oryginalna, ponieważ sam tworzyłem wszystkie komponenty, style. Było trochę HOC-sów, sam stworzyłem historię czy scroll w szachowym motywie.
</ListGroupItem>

<ListGroupItem>
Stworzyłem ostateczną wersję, ponieważ chciałem spróbować takich narzędzi jak  React Hooks, Bootstrap, Redux, Immer czy Jest wraz z React-testing-library. Ostatecznie zrezygnowałem z dwóch ostatnich, ponieważ zależało mi, aby skończyć tą stronę jak najszybciej (jest bardzo dużo do nauczenia się poza tym). Niemniej, przerobiłem całą dokumentację Jest i przetestowałem kilkanaście funkcji w tym projekcie. 
Również użyłem Formik oraz SCSS (w małym stopniu).
Zrezygnowałem tym razem z Typescript.
</ListGroupItem>


</Card.Body>
        </>
            ),
            en: (
                <>
                <Card.Header>
     <Card.Title className="text-center">
     History of the site
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-xs-0 m-md-3">
    <Card.Text>
    You may not know yet that this site is a chess game. I would like to briefly tell you how I have created it and what the most important tools I used in practice.
 </Card.Text>

 <ListGroupItem>
 Let me start by saying that this is currently the third version of the application.
  The first one was supposed to be just a mini-project and I created it in vanilla JavaScript, CSS. The chessboard itself and all interactions with it were based on HTML Canvas. I've also used Anime.js animations in couple of places.
</ListGroupItem>

<ListGroupItem>
The second was very similar to the one that you can see now. I used React (no hooks), SCSS, Formik, Typescript. It was a more original version, because I created all the components and styles myself. There were some HOCs and I made a history or a scroll-in-a-chess-theme myself.
</ListGroupItem>

<ListGroupItem>
I have created the final version because I wanted to try React Hooks, Bootstrap, Redux, Immer and Jest with React-testing-library. In the end, I gave up on the last two because I was committed to finish this page rather fast (there's a lot to learn besides that). Nevertheless, I have read the whole Jest documentation and tested several functions in this project.
I also used Formik and SCSS (to a small extent).
I gave up Typescript this time.
</ListGroupItem>


</Card.Body>

                </>
            )
        })
    }
</Card>


    )
})

export default ChessHistory;