import React from "react";
import classes from "./BoardMotive.module.scss";



export default function ColorMotive ({
    isUserMotive,
    className,
    id,
    isActive = false,
    colors: {first, second},
    withoutPreview,
    onClick,
    onDoubleClick,
    selectedField,
    ...props
})  {
        // first color is the in the left bottom corner


        function Quadrate ({color, isSelected}) {
            return <div 
            onClick={onClick &&( () => onClick(id, color))}
            className="w-50 h-50" 
            style={{
                backgroundColor: color,
                boxShadow: isSelected ? "0 0 4px lightcyan" : null
            }} />
        }

        function Container({ children }) {
        return (
            <div
                className={`${className} ${classes.ColorMotive} ${isActive ? classes.Chosen : ""} cursor-pointer`}
                onDoubleClick={onDoubleClick && (() => onDoubleClick({first, second}))}
                {...props}
            >
                {children}
            </div>
        );
    }

    const isFirstFieldSelected = selectedField === 'first',
          isSecondFieldSelected = selectedField === 'second';

        const quadrates = (
            <>
            <Quadrate color={second} isSelected={isSecondFieldSelected}/>
            <Quadrate color={first} isSelected={isFirstFieldSelected} />
            <Quadrate color={first} isSelected={isFirstFieldSelected} />
            <Quadrate color={second} isSelected={isSecondFieldSelected} />
            </>
        )

        function Preview() {
        return (
            <div className={`${classes.ColorMotive} ${classes.Preview} bg-secondary`}>
                {quadrates}
            </div>
        );
    }



    return (
        <Container>
           {!withoutPreview && <Preview />} 
            {quadrates}
        </Container>
    )
}