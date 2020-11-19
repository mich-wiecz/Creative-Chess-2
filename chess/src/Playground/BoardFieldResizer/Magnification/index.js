import React from 'react'
import classes from '../BoardFieldResizer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';






export default function Magnification({
    handleMagnification,
    boardMotive,
    magnification
}) {
  return (
    <section
    aria-label="enlarge actual board fields by multiplication "
   onClick={handleMagnification}
   className={classes.Microscope}
   style={{ color: boardMotive.first }}
>
<FontAwesomeIcon icon={faMicroscope} />
    <span>
 x<strong>{magnification}</strong>
    </span>  
</section>
  )
}

