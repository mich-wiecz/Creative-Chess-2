import React from 'react';
import 'react-resizable/css/styles.css';
import {ResizableBox} from 'react-resizable'


export default function Displayer({
    className = '', 
    children, 
    show, 
    ...props
}) {

    const minWidth = 800;


   if (show) return (
        <ResizableBox
        className={`${className} mb-5 react-resizable bg-primary text-light p-4  overflow-auto rounded border-maroon fade ${show && "show"}`}
        style={{
            width: minWidth,
            position: 'absolute',
            top: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
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
        minConstraints={[minWidth, 200]}
        maxConstraints={[minWidth, 800]}
        width={minWidth}
        height={400}
        {...props}
        >
            {children}
        </ResizableBox>
        
    )
    return null;
}



