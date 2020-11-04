import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import unitsCalculator from '@global-functions/unitsCalculator';
import changeNumericProperties from '@global-functions/changeNumericProperties';
import classes from './BoardFieldResizer.module.scss';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';

import ListGroup from 'react-bootstrap/ListGroup';



const boardColorMotive = {first: 'orange', second: 'blue'}


export default function BoardFieldResizer() {


    const [boardFieldSize, setBoardFieldSize] = useState({
        x: 40,
        y: 40
        });

    const multiplyObjectValues = (object, multiplier) => {
        if(multiplier === 1) return {...object};
        return changeNumericProperties(object, value => {
            const result = value * multiplier;
            return Number(result.toFixed(2));
        })
    }


    const SIZE_EXTREMES = {
        minX: 40,
    minY: 40,
    maxX: 120,
    maxY: 120,
    };


    const [magnification, setMagnification] = useState(1);
    const [actualUnit, setActualUnit] = useState('px');
    const [areProportionsKept, setAreProportionKept] = useState(true);
    const [sizeExtremes, setSizeExtremes] = useState(SIZE_EXTREMES);
    const [size, setSize] = useState({
        x: boardFieldSize.x,
        y: boardFieldSize.y
    })


    const  handleUnitsChange = (e) => {
        const newUnit = e.currentTarget.value;
        if (actualUnit === newUnit) return;
        const multiplier = unitsCalculator.getMultiplier(actualUnit, newUnit);
        if (!multiplier) {
          console.error(`Unknown unit: ${newUnit}`);
          return;
        }

        setActualUnit(newUnit);
        setSizeExtremes(prev => this.multiplyObjectValues(prev, multiplier));
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

        setBoardFieldSize({x: newX, y: newY})
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
            x: sizeExtremes.x * multiplier,
            y: sizeExtremes.y * multiplier
        });
        setSizeExtremes(prev => multiplyObjectValues(prev.sizeExtremes, multiplier))
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
          return (prev === 2 ? 1 : prev + 1) 
      })
    }


    function renderAxisBoardFields(...coords) {
        return coords.map((coordObj, index) => {
            return (
                <div
                    key={index}
                    className={classes.AxisBoardField}
                    style={{
                        width: coordObj.x,
                        height: coordObj.y,
                        borderColor: boardColorMotive.first,
                    }} />
            );
        });
    }


    const setStep = () => {
        switch (actualUnit) {
          case "px":
            return 10;
          case "in":
            return 0.05;
          default:
            return 1;
        }
      };

    return (
        <Container className={classes.Wrapper}>
            <section
                aria-label="enlarge actual board fields by multiplication "
               onClick={handleMagnification}
               className={classes.Microscope}
               style={{ color: boardColorMotive.first }}
            >
            <FontAwesomeIcon icon={faMicroscope} />
                <span>
             x<strong>{magnification}</strong>
                </span>  
            </section>

            <section className={classes.AxisPart}>
            <div
            className={classes.PotentialBoardField}
            style={{
                width: `${sizeExtremes.maxX}${actualUnit}`,
                height: `${sizeExtremes.maxY}${actualUnit}`,
                backgroundColor: boardColorMotive.second,
                color: boardColorMotive.first,
              }}
            >
                <div
                 onDrag={(e) =>
                    e.preventDefault()
                  }
                  onMouseMove={handleMouseMove}
                  className={classes.ResizableBoardField}
                  style={{
                    width: `${size.x}${actualUnit}`,
                    flexBasis: `${size.y}${actualUnit}`,
                  }}
                  color={boardColorMotive.first}
                />
                <span className={classes.AxisY} />
                <span className={classes.AxisX} />

                  <div 
                  className={`${classes.MaxY} d-inline-block`}
                  >
                      <div className={classes.MaxValue}>
                      <FormControl 
                         name="x"
                         className={classes.Input}
                         type="number"
                         value={size.x * magnification}
                         onChange={handleInputChange}
                         step={setStep()}
                      />
                      </div>
                      <strong>
                          {sizeExtremes.maxX * magnification}
                        </strong>
                  </div>
            </div>
            {
                renderAxisBoardFields(
                    { x: "25%", y: "25%" },
                    { x: "50%", y: "50%" },
                    { x: "75%", y: "75%" }
                )
            }
            </section >
            
            <section className={classes.InterfacePart}>
            
            <ListGroup className={classes.Options}>
  <ListGroup.Item>
  <div>
                <span className={classes.ProportionsOption}>
                  {areProportionsKept
                    ? "Proporcje zachowywane"
                    : "Brak zachowywania proporcji"}
                </span>
                <PawnSwitch
                  className={classes.PawnSwitch}
                  isOn={areProportionsKept}
                  changeOption={toggleProportionsKeeping}
                />
              </div>
  </ListGroup.Item>
  <ListGroup.Item>
  <div className={classes.OptionGroup}>
                <p>Aktualne jednostki:</p>
                <FormControl
                  as="select"
                  value={actualUnit}
                  onChange={handleUnitsChange}
                  className={classes.UnitSelector}
                >
                  <option value="mm">mm</option>
                  <option value="px">px</option>
                  <option value="in">in</option>
                </FormControl>
              </div>
  </ListGroup.Item>
</ListGroup>

            <section className={classes.BtnGroup}>
            <Button onClick={handleSettingMinSize}>Rozmiar minimalny</Button>
          <Button onClick={handleChangingBoardFieldSize}>
            Zatwierdź
          </Button>
            </section>
            </section>
        </Container>
        
    )

}



// c\((classes), \["(\w+)"\]\)