import React, {useState, useEffect} from 'react';
import Toast from 'react-bootstrap/Toast';
import classes from './MyToast.module.scss'

export default function MyToast ({
    className, 
    title, 
    children, 
    show, 
    onClose, 
    dependencies = [], 
    autohide = true,
    delay = 3000,
    ...props
}) {

    const properDependencies = Array.isArray(dependencies) ? dependencies : [dependencies]

    const [isActive, setIsActive] = useState(false);
    const [effectCount, setEffectCount] = useState(0);

    useEffect(() => {
        if (effectCount < 1) {
            setEffectCount(prev => prev + 1)
            return;
        }
        setIsActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...properDependencies])


    return (
        <Toast 
        autohide={autohide}
        delay={delay}
        show={show ? show : isActive}
        onClose={onClose ? onClose : (() => setIsActive(false))}
        className={`${className ? className : ''} ${classes.Toast} bg-primary`}
       {...props}
        >
  <Toast.Header>
    <strong className="mr-auto">{title ? title : 'Plac Zabaw'}</strong>
  </Toast.Header>
  <Toast.Body>
      {children}
      </Toast.Body>
</Toast>
    )
}