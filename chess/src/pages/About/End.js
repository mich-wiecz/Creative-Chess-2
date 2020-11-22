import React from 'react';


export default function End({children}) {

    return (

<p className="bg-light my-3 rounded p-2">
<span className="d-block">
   Bardzo się cieszę, że doszedł(a) Pan / Pani do tego końca. 
</span>
<span className="d-block">
Zachęcam do kontaktu, zadawania pytań. 
</span>
<div className="d-flex justify-content-end w-50 my-3" 
>
   {children}
</div>

</p>
    )
}

