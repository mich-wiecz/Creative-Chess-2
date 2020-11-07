import React from "react";
import classes from "./ColorMotive.module.scss";



export default function ColorMotive ({
    isUserMotive,
    className,
    id,
    isActive = false,
    colors: {first, second},
    withoutPreview,
    onClick,
    onDoubleClick,
    ...props
})  {
        // first color is the in the left bottom corner


        function Quadrate ({color}) {
            return <div 
            onClick={onClick &&( () => onClick(id, color))}
            className="w-50 h-50" 
            style={{backgroundColor: color}} />
        }

        function Container({ children }) {
        return (
            <div
                className={`${className} ${classes.ColorMotive} ${isActive && classes.Chosen} cursor-pointer`}
                onDoubleClick={onDoubleClick && (() => onDoubleClick({first, second}))}
                {...props}
            >
                {children}
            </div>
        );
    }


        const quadrates = (
            <>
            <Quadrate color={second}/>
            <Quadrate color={first}/>
            <Quadrate color={first}/>
            <Quadrate color={second}/>
            </>
        )

        const Preview = () => (
             <div className={`${classes.ColorMotive} ${classes.Preview} bg-secondary`}>
            {quadrates}
            </div>
        )



    return (
        <Container>
           {!withoutPreview && <Preview />} 
            {quadrates}
        </Container>
    )
}