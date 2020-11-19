import React, {useState, useEffect} from 'react';

import unitsCalculator from '@global-functions/unitsCalculator';
import changeNumericProperties from '@global-functions/changeNumericProperties';
import classes from './BoardFieldResizer.module.scss';
import Container from 'react-bootstrap/Container';
import {useSelector, useDispatch} from 'react-redux';
import {boardFeatureChanged, selectBoardFeatures, } from 'redux/chessSlice';



import Magnification from './Magnification';
import Resizer from './Resizer';
import ResizingOptions from './ResizingOptions';
import ExecutivePanel from './ExecutivePanel'



const SIZE_EXTREMES = {
  minX: 40,
  minY: 40,
  maxX: 120,
  maxY: 120,
  };



  const multiplyObjectValues = (object, multiplier) => {
    if(multiplier === 1) return {...object};
    return changeNumericProperties(object, value => {
        const result = value * multiplier;
        return Number(result.toFixed(2));
    })
}



export default function BoardFieldResizer() {


  const {frozenFieldSize, boardMotive} = useSelector(selectBoardFeatures);
  const dispatch = useDispatch()



    const [boardFieldSize, setBoardFieldSize] = useState({
        x: 40,
        y: 40
        });
    const [magnification, setMagnification] = useState(1);
    const [actualUnit, setActualUnit] = useState('px');
    const [areProportionsKept, setAreProportionKept] = useState(true);
    const [sizeExtremes, setSizeExtremes] = useState(SIZE_EXTREMES);
    const [size, setSize] = useState({
        x: boardFieldSize.x,
        y: boardFieldSize.y
    })



    useEffect(() => {
      if(!frozenFieldSize) return;
      setBoardFieldSize(frozenFieldSize)
     }, [frozenFieldSize])




    const  handleUnitsChange = (e) => {
        const newUnit = e.currentTarget.value;
        if (actualUnit === newUnit) return;
        const multiplier = unitsCalculator.getMultiplier(actualUnit, newUnit);
        if (!multiplier) {
          console.error(`Unknown unit: ${newUnit}`);
          return;
        }

        setActualUnit(newUnit);
        setSizeExtremes(prev => multiplyObjectValues(prev, multiplier));
        setSize(prev => multiplyObjectValues(prev, multiplier));
    }


    const toggleProportionsKeeping = () => {
        setAreProportionKept(prev => !prev);
    }


    const handleChangingBoardFieldSize = () => {
        let [newX, newY] = unitsCalculator.calculate(
            [size.x * magnification, size.y * magnification],
            {
                baseUnit: actualUnit,
                resultUnit: 'px'
            }
        )

         dispatch(boardFeatureChanged(
          ['frozenFieldSize', {x: newX, y: newY}]))
    }


    const resetToDefault = () => {
      dispatch(boardFeatureChanged(
        ['frozenFieldSize', null]))
    }


    const adjustSize = (size, axis, sizeExtremes) => {
        const upperAxis = axis.toUpperCase();
        let min = sizeExtremes[`min${upperAxis}`],
          max = sizeExtremes[`max${upperAxis}`];


        if (size < min) {
          return min;
        } else if (size > max) {
          return max;
        }
    
        return size;
    }


    const handleMouseMove = (e) => {


        if (e.buttons !== 1) return;

        let [deltaX, deltaY] = unitsCalculator.calculate(
            [e.movementX, -e.movementY],
            {
                baseUnit: 'px',
                resultUnit: actualUnit
            }
        );


        if (areProportionsKept) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                deltaY = deltaX;
              } else {
                deltaX = deltaY;
              }
        }

        setSize(prev => {
            return {
                x: adjustSize(prev.x + deltaX, 'x', sizeExtremes),
                y: adjustSize(prev.y + deltaY, 'y', sizeExtremes)
            }
        })

    }


    const  handleSettingMinSize = () => {
        const multiplier = 1 / magnification;
        setMagnification(1);
        setSize({
            x: sizeExtremes.minX * multiplier,
            y: sizeExtremes.minY * multiplier
        });
        setSizeExtremes(prev => multiplyObjectValues(prev, multiplier))
    }


    const handleInputChange = (e) => {
        let {name, value} = e.currentTarget;
        value = Number(value) / magnification;

        let sizeObject = {};

        if (areProportionsKept) {
            sizeObject = {
                x: adjustSize(value, 'x', sizeExtremes),
                y: adjustSize(value, 'y', sizeExtremes)
            }
        } else {
          let axis;
          if (name === 'x') {
              axis = 'y'
          }  else (axis = 'x');

          sizeObject[name] = adjustSize(value, axis, sizeExtremes);
        }

        setSize(prev => {return {...prev, ...sizeObject}})
    };


  const  handleMagnification = () => {
      setMagnification(prev => {
        if (prev === 1) return 2;
        if (prev === 2) return 0.5;
        if (prev === 0.5) return 1;
      })
    }





    return (
      <>
        <Container className={`${classes.Wrapper} m-4 `}>
          <Magnification 
          handleMagnification={handleMagnification}
          boardMotive={boardMotive}
          magnification={magnification}
          />
          <div className="w-100 d-flex  flex-column flex-md-row justify-content-md-around" >
           <Resizer 
           sizeExtremes={sizeExtremes}
           actualUnit={actualUnit}
           boardMotive={boardMotive}
           handleMouseMove={handleMouseMove}
           size={size}
           magnification={magnification}
           handleInputChange={handleInputChange}
           />
          <ResizingOptions 
          areProportionsKept={areProportionsKept}
          toggleProportionsKeeping={toggleProportionsKeeping}
          actualUnit={actualUnit}
          handleUnitsChange={handleUnitsChange}
          />
            </div>
        </Container>
       <ExecutivePanel 
       handleChangingBoardFieldSize={handleChangingBoardFieldSize}
       resetToDefault={resetToDefault}
       handleSettingMinSize={handleSettingMinSize}
       />
   </>
        
    )

}

