import React from 'react';


export default function MainBar({children, ...props}) {

    return (
        <div 
      style={{
        zIndex: 150,
        width: '50%'
      }}
      className=" mx-auto d-flex"
      aria-label="Główny pasek na stronie"
      {...props}
      >
        {children}
      </div>
    )
}