import React from 'react';
import {useTranslation} from 'contexts/TranslationProvider'

export default function End({children}) {


 const getTranslation = useTranslation()

    return (

<p className="bg-light my-3 rounded p-2">
    {
        getTranslation({
            pl: (
                <>
             <span className="d-block">
             Bardzo się cieszę, że dotarł(a) Pan / Pani do tego końca. 
              </span>
             <span className="d-block">
              Zachęcam do kontaktu, zadawania pytań. 
               </span>
                </>
            ),
            en: (
                <>
             <span className="d-block">
             I am very glad that you have reached the end.
              </span>
             <span className="d-block">
             I encourage you to contact me and ask questions.
               </span>
                </>
            ),
        })
    }

<div className="d-flex justify-content-end w-50 my-3" 
>
   {children}
</div>

</p>
    )
}

