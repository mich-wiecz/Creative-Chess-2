import React from 'react'
import classes from '../ColorMotive/ColorMotive.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ownClasses from './MotivesAdder.module.scss';


export default function MotivesAdder() {
    return (
        <div className={`${classes.ColorMotive} border d-flex justify-content-center align-items-center cursor-pointer ${ownClasses.Adder}` }> 
        <FontAwesomeIcon icon={faPlus} size="2x"/>
        </div>
    )
}
