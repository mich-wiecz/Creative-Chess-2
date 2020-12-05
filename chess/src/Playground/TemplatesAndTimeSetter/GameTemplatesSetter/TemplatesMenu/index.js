import React from 'react';
import Nav from 'react-bootstrap/Nav';




export default function TemplatesMenu({
    activeImage,
    setActiveImage,
    activeGameTemplate,
    templatesOrder,
    templatesToShow
}) {


  const setTabColor = (temp, activeTemp, activeImage, index) => {
    if (index === activeImage) {
      return 'bg-secondary'
    }
    if (activeTemp === temp) {
      return "bg-success"
    }

    return 'bg-maroon'
  }


    return (
     <Nav 
     defaultActiveKey={0}
     activeKey={activeImage}
     onSelect={(key) => {
       setActiveImage(Number(key))
     } }
    variant="pills" 
    className="flex-column w-100 h-100 justify-content-center rounded ">
    {
      templatesOrder.map((tempName, index) => {
        const {title} = templatesToShow[tempName];
        return (
     <Nav.Item key={tempName}  className="my-1">
  <Nav.Link 
  eventKey={index} 
  title={tempName} 
  className={`text-light ${setTabColor(tempName, activeGameTemplate, activeImage, index)}   `}
  >
    {title}
  </Nav.Link>
  </Nav.Item>
        )
      })
    }
</Nav>
    )
  }