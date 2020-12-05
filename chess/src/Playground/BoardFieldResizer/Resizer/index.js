import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import classes from '../BoardFieldResizer.module.scss';




function AxisBoardFields({boardMotive, coords}) {
    return coords.map((coordObj, index) => {
        return (
            <div
                key={index}
                className={classes.AxisBoardField}
                style={{
                    width: coordObj.x,
                    height: coordObj.y,
                    borderColor: boardMotive.first,
                }} />
        );
    });
}







export default  function Resizer({
    sizeExtremes, 
    actualUnit,
    boardMotive,
    handleMouseMove,
    size,
    magnification,
    handleInputChange,

}) {


    const setStep = () => {
        switch (actualUnit) {
          case "px":
            return 5;
          case "in":
            return 0.05;
          default:
            return 1;
        }
      };



    return (
      <section className={`${classes.AxisPart} p-sm-5`}>
      <div
      className={classes.PotentialBoardField}
      style={{
          width: `${sizeExtremes.maxX}${actualUnit}`,
          height: `${sizeExtremes.maxY}${actualUnit}`,
          backgroundColor: boardMotive.second,
          color: boardMotive.first,
        }}
      >
          <div
           onDragStart={(e) =>
              e.preventDefault()
            }
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => {
              handleMouseMove(e)
            }}
            className={classes.ResizableBoardField}
            style={{
              width: `${size.x}${actualUnit}`,
              flexBasis: `${size.y}${actualUnit}`,
              background: boardMotive.first,
            
            }}
          />
          <span className={classes.AxisY} />
          <span className={classes.AxisX} />
            <div 
            className={`${classes.MaxY}`}
            >
                <div className={classes.MaxValue}>
                <FormControl 
                   name="y"
                   className={classes.Input}
                   type="number"
                   value={(size.y * magnification).toFixed(1)}
                   onChange={handleInputChange}
                   step={setStep()}
                />
                </div>
                <strong>
                    {(sizeExtremes.maxX * magnification).toFixed(1)}
                  </strong>
            </div>


            <div 
            className={`${classes.MaxX}`}
            >
                <div className={classes.MaxValue}>
                <FormControl 
                   name="x"
                   className={classes.Input}
                   type="number"
                   value={(size.x * magnification)}
                   onChange={handleInputChange}
                   step={setStep()}
                />
                </div>
                <strong>
                    {(sizeExtremes.maxX * magnification).toFixed(1)}
                  </strong>
            </div>


{
        <AxisBoardFields
        boardMotive={boardMotive}
        coords={[ { x: "25%", y: "25%" },
        { x: "50%", y: "50%" },
        { x: "75%", y: "75%" }]}   
          />
      }
      </div>

      </section >
    )
  }

