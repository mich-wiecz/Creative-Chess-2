import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';






function SlideBackground ( {
  boardSide,
    tempName, 
    image, 
    ...props
}) {
    return   <Image
    rounded
    width={tempName === 'capablanca' ? boardSide * 1.25 : boardSide}
    height={boardSide}
    className="d-block mt-4 mx-auto"
    src={image}
    alt="zdjęcie szachownicy"
    {...props}
  />
  }




export default   function BoardsSlides ({
    boardSide,
    activeImage,
    setActiveImage,
    templatesOrder,
    activeGameTemplate,
    templates,
    templatesToShow,
    handleChangingGameTemplate
}) {


    


    return (
<Carousel 
interval={null}
activeIndex={activeImage}
onSelect={(index) => {
setActiveImage(index)
} }
indicators={false} 
>
{
templatesOrder.map((tempName) => {
 let text, variant;
 const isActive = tempName === activeGameTemplate
 if(isActive) {
   text = `${tempName === '960' ? "Losuj jeszcze raz" : "Aktualnie wybrany"}`;
   variant = "success"
 } else {
   text = 'Wybierz';
   variant = undefined;
 }

 const isTemplate = templates.hasOwnProperty(tempName);
 return (
   <Carousel.Item 
   key={tempName} 
   >
     <div className="d-flex flex-column justify-content-center" style={{height: `${boardSide}`}}>
     <SlideBackground
     boardSide={boardSide}
     image={templatesToShow[tempName].board}
     tempName={tempName}
     />
     <Carousel.Caption>
      <Button 
      variant={variant}
      disabled={!isTemplate}
      onClick={(tempName === '960' || !isActive) ? (() => {
       handleChangingGameTemplate(tempName)
      }) : undefined }
      className="mx-3"
      style={{
        transform: `translateY(-${boardSide / 3.5}px)`,
        width: 200
     }}
      >
       {isTemplate ? text : "Niedostępny"} 
       </Button>
     </Carousel.Caption>
     </div>
   </Carousel.Item>
 )
})
}
</Carousel>
    )
  }