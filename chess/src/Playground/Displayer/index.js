import React, {useState} from 'react';
import 'react-resizable/css/styles.css';
import {ResizableBox} from 'react-resizable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faEye, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';


const mobileIconsSize = "3x";

function IconsGroup({mobileVersion, onClose, children}) {
    return (
        <div 
        className="d-inline-block bg-primary rounded border border-maroon p-1"
        style={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
            zIndex: 5000
        }}
        >
            {children}
        <Button className="align-top m-0 p-0">
       <FontAwesomeIcon icon={faWindowClose} 
        size={`${mobileVersion ? mobileIconsSize : "2x"}` }
        color="darkred"
        onClick={onClose}
        />
        </Button>
        </div>
    )
}




const Wrapper = ({
    mobileVersion, 
    minWidth, 
    className, 
    show, 
    children, 
    onClose, 
    opacity,
    handleOpacity,
    ...props
}) =>  {
     
  if (mobileVersion) {
    return  (
        <div 
        className={`mb-2  bg-primary text-light p-4  overflow-auto rounded border-maroon fade ${show && "show"}`}
        style={{
            position: 'relative',
            width: "100%",
            height: "100%",
            minHeight: 500,
            opacity,
        }}
        {...props}
        >
       <IconsGroup 
        onClose={onClose}
        mobileVersion={mobileVersion}
       >
           <Button 
           className="align-top m-0 p-0"
           onMouseDown={() => handleOpacity('transparentize')}
           onMouseUp={() => handleOpacity('normal')}
           onMouseLeave={() => handleOpacity('normal')}
           >
           <FontAwesomeIcon 
           icon={faEye}
           size={mobileIconsSize}
           className="mr-2 text-secondary"
           />
           </Button>
        </IconsGroup>
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
            transform: `translateX(-50%)`,
            zIndex: 101,
        }}
        handle={ (h) => 
            <FontAwesomeIcon 
            icon={faArrowsAltV}
            size={mobileIconsSize}
            className={`mr-2 text-secondary react-resizable-handle react-resizable-handle-${h}`}
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
             <IconsGroup 
        onClose={onClose}
        mobileVersion={mobileVersion}
       />
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
}) {

    const [opacity, setOpacity] = useState(1);


    const minWidth = width;
   if (!show) return null;


    const handleOpacity = (type) => {
       if (type === 'transparentize') {
           setOpacity(0.1)
       } else {
           setOpacity(1);
       }
    }



   return (
       <Wrapper 
       mobileVersion={mobileVersion}
       width={width}
       className={className}
        show={show}
        onClose={onClose}
        minWidth={minWidth}
        opacity={opacity}
        handleOpacity={handleOpacity}
       >
            {children}
       </Wrapper>
   )
}



