
 import React, {forwardRef} from 'react';
 import Card from 'react-bootstrap/Card';
import {useTranslation} from 'contexts/TranslationProvider';

 
 const Bio = forwardRef((_props, ref) => {

const getTranslation = useTranslation();
     return (
<Card id="bio" ref={ref} className="mb-5">
 <Card.Header>
     <Card.Title className="text-center">
      {getTranslation({
          pl: 'Życiorys',
          en: "Short biography"
      })}
     </Card.Title>
     </Card.Header>
 <Card.Body className=" m-3">
    <Card.Text>
        {
            getTranslation({
                pl: (
                    <>
                    <article>
                    <h5>
                    Młodość
                                     
                    </h5>
                    <p>
                Wychowałem się w centrum Domaniewic 
                (licząca około 5 tys. mieszkańców gmina w woj. łódzkim). 
                Tam też uczyłem się do czasów liceum, kiedy to dojeżdżałem do pobliskiego 
                Łowicza. Od zawsze najbardziej podchodziły mi przedmioty ściśle, choć niestety miałem mało styczności z programowaniem.
                </p>
                </article>
                <article>
                    <h5>Okres po liceum</h5>
                    <p>
                Podjąłem studia na kierunku Finanse i rachunkowość na Uniwersytecie Łódzkim. 
              Po roku czułem się jednak dość rozczarowany studiami, nie wyobrażałem sobie siebie dalej w pracy z finansami czy ekonomią. Postanowiłem jednak dać jeszcze szansę kierunkowi, choć próbując rozbudzić swoje zainteresowanie bardziej na własną rękę.
                 Na drugi rok przeniosłem się więc na tryb zaoczny. 
                 Obok studiowania, uczęszczałem również na kurs księgowości i 
                 odbyłem 3-miesięczny staż. W dalszym ciągu jednak nie znalazłem wizji na przyszłość.
                 Zrezygnowałem więc po drugim roku ze studiów.
                 Podjąłem pracę jako magazynier. W tym okresie dużo myślałem co zrobić dalej, próbowałem różnych rzeczy. 
                 Szczerze mówiąc, sceptycznie dość podszedłem do programowania, 
                 gdyż wydawało mi się to być bardzo podobne do księgowości. 
                 Zaskoczyłem się jednak mocno na plus. 
                Znalazłem w programowaniu możliwość bycia aktywnym twórcą, co bardzo mi odpowiada.
                  Po około pół roku zrezygnowałem z pracy 
                 i postanowiłem podjąć poważną naukę na własną rękę. 
                </p>
                </article>
                <article>
                    <h5>Nauka programowania</h5>
                    <p>
                 Zacząłem się uczyć pod 
                 koniec ubiegłego roku, mieszkając jeszcze z rodzicami. W marcu tego roku 
                 przeprowadziłem się do Warszawy. Planowałem uczęszczać na kursy i w pełni poświęcić się nauce. Oszacowałem, że w lipcu skończą mi się oszczędności z pracy magazyniera. Wtedy więc (bądź lekko wcześniej) chciałem znaleźć pracę, nawet jeśli nie jako programista, to zarabiać na siebie i dalej uczyć się w godzinach wolnych.
                 Jednakże, rodzice wydłużyli ten okres do dziś, ponieważ utrzymują mnie oni przez ostatnie 3 miesiące. Pracowałem ciężko, uczyłem się i 
                  tworzyłem stronę, na której się właśnie Pan / Pani znajduje.
                  Uważam, że było warto i efektywnie wykorzystałem ten czas.
                  Cała nauka ograniczyła się do 
                  internetu, gdzie znalazłem masę wysokiej jakości źródeł. 
                  Na koniec chcę po prostu zapewnić, że nadal mam w sobie chęć do nauki i długą listę rzeczy, w których chciałbym
                  być biegły.
                </p>
                </article>
                </>
                ),
                en: (
                    <>
                    <article>
                    <h5>
                    Youth
                    </h5>
                    <p>
                    I grew up in the center of Domaniewice
                 (a commune with a population of about 5,000 in the Łódź Province).
                 I studied there until high school, when I commuted to a nearby
                 Łowicz. I've always had a preference to hard sciences, although unfortunately I had little contact with programming.
                </p>
                </article>
                <article>
                    <h5>After high school</h5>
                    <p>
                    I started studies in Finance and accounting at the University of Łódź. After a year, I felt quite disappointed with my studies. I could not imagine myself working with finance or economics. Nonetheless, I decided to give this field a chance, although trying to arouse my interest more on my own.
                 So I switched to extramural studies for the second year.
                 In addition to studying, I also attended an accounting course and
                 I did a 3-month internship. Still, I didn't find my vision of the future.
                 So I quit my studies after the second year.
                 I took a job in a warehouse. During this period, I was thinking a lot about what to do next and I tried different things.
                 Honestly, I was quite skeptical about programming,
                 because it seemed to be very similar to accounting.
                 I was positively surprised though. In programming, I found the possibility of being an active creator, which suits me very well. After about half a year, I quit my job
                 and decided to undertake serious learning on my own.
                </p>
                </article>
                <article>
                    <h5>Learning programming</h5>
                    <p>
                    I started learning near the
                 end of last year, still living with my parents. In March this year
                 I moved to Warsaw. I planned to attend the courses and devote myself fully to my studies. I estimated that in July I would run out of savings from working as a warehouseman. Then (or slightly earlier) I wanted to find a job (as a web developer or not) to earn money and continue learning during my free hours.
                 However, my parents have extended the period to this day, because they have been supporting me financially for the last months. I have been working hard, learning and creating the website you are on. I think it was worth it and I used that time effectively. My studies was limited to the internet, where I found tons of high-quality resources. Finally, I just want to assure you that I still have a willingness to learn and a long list of things I'd like to be fluent in.
                </p>
                </article>
                </>
                )
            })
        }
       
     
    </Card.Text>
</Card.Body>

</Card>


     )
 })
 

 export default Bio;