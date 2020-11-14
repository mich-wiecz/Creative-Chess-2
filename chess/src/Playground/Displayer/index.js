import React from 'react';
import 'react-resizable/css/styles.css';
import {ResizableBox} from 'react-resizable'
import classes from './Displayer.module.scss';


export default function Displayer({
    className = '', 
    children, 
    show, 
    ...props
}) {
    return (
        <ResizableBox
        className={`${className} react-resizable bg-primary text-light ${classes.Displayer}  p-4  overflow-auto rounded border-maroon fade ${show && "show"}`}
        style={{
            width: 1000,
            position: 'relative',
            zIndex: 101,
        }}
        handle={ (h) => 
        <div
        className={`react-resizable-handle react-resizable-handle-${h}`}
        style={{
        width: 60,
        height: 60
        }}
        />
        }
        resizeHandles={[ 'se']}
        axis="y"
        minConstraints={[860, 200]}
        maxConstraints={[860, 800]}
        width={860}
        height={400}
        {...props}
        >
            {children}
        </ResizableBox>
        
    )
}



