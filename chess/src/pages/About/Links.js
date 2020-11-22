import React, {} from 'react';
 import ListGroupItem from 'react-bootstrap/ListGroupItem';
 import Button from 'react-bootstrap/Button';
import {Link} from 'react-scroll';





export function TocLink ({text, id}) {
    return (
        <ListGroupItem className="bg-secondary">
            <Button style={{
                backgroundColor: '#b5a448',
            }} className="w-100 h-100 m-0">
        <Link 
        className="w-100 h-100 d-block"
        to={id}
        spy={true}
        smooth={true}
        duration={300}  
        containerId="container" 
        >
     {text}
        </Link>
        </Button>
    </ListGroupItem>
    )
}


function SideLink ({ id, children, ...props}) {
    return (
        <Link 
        style={{
            backgroundColor: '#b5a448',
            border: '3px solid transparent'
        }} 
        {...props}
        className="w-100 d-block text-light m-0 p-2 cursor-pointer"
        to={id}
        spy={true}
        smooth={true}
        duration={300}  
        offset={-150}
        containerId="container" 
        >
     {children}
        </Link>
    )
}



export function TableOfContent () {
    return (
        <section>
     <article 
className=" rounded p-4 text-center"
style={{
    backgroundColor: '#b5a448',
    margin: '3% 15% 3% 15%'
}}
>
    <h5 style={{marginBottom: '3%'}}>
    Spis treści
    </h5>
<TocLink 
text="Wstęp"
id="prelude"
/>
<TocLink 
text="Umiejętności twarde"
id="hardSkills"
/>
<TocLink 
text="Umiejętności miękkie"
id="softSkills"
/>
<TocLink 
text="Moja motywacja"
id="motivation"
/>
<TocLink 
text="Krótka biografia"
id="bio"
/>
<TocLink 
text="Historia strony"
id="history"
/>
</article>
   </section>
    )
}




export const Navigation = ({
    loaded, 
    container,
    sections,
    windowHeight
}) => {

    if (!sections[0].current || !loaded || windowHeight < 500) return null;
    
    const {top, bottom} = container.current.getBoundingClientRect()
    const containerVisibleHeight = bottom - top;
    
    return sections.map((ref, index) => {

         return (
    <SideLink 
    key={index}
    className="my-1  cursor-pointer m-lg-0 p-2 align-items-center rounded text-light w-100"
    style={{
        backgroundColor: 'black',
        position: 'absolute',
        top: (ref.current.offsetTop / container.current.scrollHeight) * containerVisibleHeight,
        left: `50%`,
        transform: 'translateX(-50%)',
        zIndex: 1000,
        opacity: 1,
        display: 'block',
        fontSize: '1.1rem',
    }}
    id={ref.current.id}
    >
     <p className="m-0 p-0">
         {ref.current.querySelector('.card-title').textContent}
     </p>
    </SideLink>
    
         )
     })
    
        }






 
