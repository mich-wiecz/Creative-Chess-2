import React from 'react';
import 'react-resizable/css/styles.css';
import {ResizableBox} from 'react-resizable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';


const Wrapper = ({mobileVersion, minWidth, className, show, children, onClose, ...props}) =>  {
     
  if (mobileVersion) {
    return  (
        <div 
        className={`mb-2  bg-primary text-light p-4  overflow-auto rounded border-maroon fade ${show && "show"}`}
        style={{
            position: 'relative',
            // top: '3%',
            // left: '0',
            width: "100%",
            height: "100%",
            // zIndex: 101,
        }}
        {...props}
        >
            {children}
        </div>
    )
  }  else {
      return    (
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
        position: 'absolute',
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
  }
}



export default function Displayer({
    width,
    mobileVersion,
    className = '', 
    children, 
    show, 
    onClose,
    ...props
}) {

    const minWidth = width;


   if (!show) return null;

   return (
       <Wrapper mobileVersion={mobileVersion}
       width={width}
       className={className}
        show={show}
        onClose={onClose}
        minWidth={minWidth}
       >
            {children}
            <div 
            className="d-inline-block bg-primary"
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                cursor: 'pointer'
            }}
            >
           <FontAwesomeIcon icon={faWindowClose} 
            size={`${mobileVersion ? "3x" : "2x"}` }
            color="darkred"
            onClick={onClose}
            />
            </div>
       </Wrapper>
   )
}



