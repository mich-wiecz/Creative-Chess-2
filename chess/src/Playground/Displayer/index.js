import React, {useState} from 'react';
import 'react-resizable/css/styles.css';
import {ResizableBox} from 'react-resizable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faEye, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';



function Wrapper({
    mobileVersion,
    minWidth,
    className,
    show,
    children,
    onClose,
    opacity,
    handleOpacity,
    icons,
    ...props
}) {

    if (mobileVersion) {
        return (
            <div
                className={`d-flex flex-column mb-4  bg-primary text-light rounded  fade ${show && "show"}`}
                style={{
                    position: 'relative',
                    width: "100%",
                    opacity,
                }}
                {...props}
            >
              {icons}
                <div 
                className=" border-maroon p-4  overflow-hidden" 
                style={{ minHeight: '75vh',}}
                >
                {children}
                </div>
        </div>
           
        );
    } else {
        return (
            <ResizableBox
                className={`d-flex flex-column ${className} mb-5 react-resizable bg-primary text-light  overflow-auto rounded border-maroon fade ${show && "show"}`}
                style={{
                    width: minWidth,
                    position: 'absolute',
                    top: '3%',
                    left: '50%',
                    transform: `translateX(-50%)`,
                    zIndex: 101,
                    opacity
                }}
                handle={(h) => <FontAwesomeIcon
                    icon={faArrowsAltV}
                    size={mobileIconsSize}
                    className={`mr-2 text-secondary react-resizable-handle react-resizable-handle-${h}`} />}
                resizeHandles={['se']}
                axis="y"
                minConstraints={[minWidth, 100]}
                maxConstraints={[minWidth, 800]}
                width={minWidth}
                height={600}
                {...props}
            >
               {icons}
               <div className="p-4 h-100">
               {children}
               </div>
               
            </ResizableBox>
        );
    }
}






const mobileIconsSize = "3x",
normalIconsSize = '2x';


function IconContainer ({children}) {
    return (
        <div 
        className="d-inline-block bg-primary rounded m-1"
        >
      {children}
        </div>
    )
}

function IconsGroup({mobileVersion, onClose, handleOpacity}) {


    const getSize = () => {
       return mobileVersion ? mobileIconsSize : normalIconsSize;
    };
    const size = getSize();
    return (
        <div 
        className="d-flex justify-content-between"
        style={{
            backgroundColor: 'black'
        }}
        >
    <IconContainer>
                            <Button
                            className="align-top m-0 p-0"
                            onMouseDown={() => handleOpacity('transparentize')}
                            onTouchStart={() => handleOpacity('transparentize')}
                            onMouseUp={() => handleOpacity('normal')}
                            onTouchEnd={() => handleOpacity('normal')}
                            onMouseLeave={() => handleOpacity('normal')}
                        >
                            <FontAwesomeIcon
                                icon={faEye}
                                size={size}
                                className="mr-2 text-secondary" />
                        </Button>


        </IconContainer>
        <IconContainer>    
        <Button className="align-top m-0 p-0">
       <FontAwesomeIcon icon={faWindowClose} 
        size={size}
        color="darkred"
        onClick={onClose}
        />
        </Button>
        </IconContainer>
       </div>
    )
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
        icons={
            <IconsGroup
            onClose={onClose}
            mobileVersion={mobileVersion}
            handleOpacity={handleOpacity}
        />
        }
       >
            {children}
       </Wrapper>
     
   )
}



