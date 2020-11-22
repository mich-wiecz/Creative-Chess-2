
 import React, {forwardRef} from 'react';
 import Card from 'react-bootstrap/Card';

 
 const Bio = forwardRef((_props, ref) => {


     return (
<Card id="bio" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
     Krótka biografia
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-3">
    <Card.Text>
        <article>
            <h5>Młodość</h5>
            <p>
        Wychowałem się w centrum Domaniewic 
        (licząca około 5 tys. mieszkańców gmina w woj. łódzkim). 
        Tam też się uczyłem się do czasów liceum, kiedy to dojeżdżałem do pobliskiego 
        Łowicza. Od zawsze najbardziej podchodziły mi przedmioty ściśle, choć niestety miałem mało styczności z programowaniem.
        </p>
        </article>
        <article>
            <h5>Okres po liceum</h5>
            <p>
        Podjąłem studia na kierunku Finanse i rachunkowość na Uniwersytecie Łódzkim. 
       W pierwszym roku dzieliłem pokój z kolegą w prywatnym akademiku, a w drugim semestrze dorabiałem jeszcze w call center. Czułem się jednak dość rozczarowany studiami, nie wyobrażałem sobie siebie dalej w pracy z finansami czy ekonomią. Postanowiłem jednak dać jeszcze szansę kierunkowi, choć próbując rozbudzić swoje zainteresowanie bardziej na własną rękę.
         Na drugi rok przeniosłem się więc na tryb zaoczny. 
         Obok studiowania, uczęszczałem również na kurs księgowości i 
         odbyłem 3-miesięczny staż. W dalszym ciągu jednak nie czułem żadnego zainteresowania. I pisząc brak zainteresowania, mam tu na myśli brak wizji na przyszłość.  Jedną z rzeczy, jakiej się o sobie dowiedziałem, jest to, że chcę być aktywnym twórcą, a nie znalazłem tego w finansach.
         Zrezygnowałem więc po drugim roku ze studiów.
         Podjąłem pracę na magazynie. W tym okresie dużo myślałem co zrobić dalej, próbowałem różnych rzeczy. 
         Szczerze mówiąc, sceptycznie dość podszedłem do programowania, 
         gdyż wydawało mi się to być bardzo podobne do księgowości. 
         Zaskoczyłem się jednak mocno na plus. Po około pół roku zrezygnowałem z pracy 
         i postanowiłem podjąć poważną naukę na własną rękę. 
        </p>
        </article>
        <article>
            <h5>Nauka programowania</h5>
            <p>
         Zacząłem się uczyć pod 
         koniec ubiegłego roku, mieszkając jeszcze z rodzicami. W marcu tego roku 
         przeprowadziłem się do Warszawy, gdzie chciałem uczęszczać na kursy. W czerwcu / lipcu miałem szukać pracy, nawet jeśli nie jako programista to po prostu zarabiać na siebie i dalej uczyć się w godzinach wolnych.
          W praktyce cała moja nauka ograniczyła się do 
          internetu, gdzie znalazłem masę wysokiej jakości źródeł. 
          Cały okres wydłużył się do dziś, dzięki rodzicom, którzy utrzymują mnie przez ostatnie 3 miesiące (mimo że żyłem skromnie, nie starczyło pieniędzy z pracy magazyniera). Przez ostatnie miesiące pracowałem ciężko, uczyłem się i 
          tworzyłem stronę, na której się właśnie Pan / Pani znajduje. Mimo że z perspektywy czasu mogłem lepiej rozplanować ten okres, nie żałuję i myślę, że jestem dobrze 
          przygotowany. Ciągle mam w sobie chęć do nauki i długą listę rzeczy, w których chciałbym
          być biegły.
        </p>
        </article>
     
    </Card.Text>
</Card.Body>

</Card>


     )
 })
 

 export default Bio;