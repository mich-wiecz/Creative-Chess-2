import React, {useState, useEffect} from 'react';
import ColorMotive from '../BoardMotive'
import ChromePicker from 'react-color/lib/Chrome'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const firstCol = '#555',
secondCol = '#123';

export default function MotivesCreator({
    addUserMotive,
    preparedMotive,
    resetPreparedMotive
}) {


    const [firstColor, setFirstColor] = useState(firstCol);
    const [secondColor, setSecondColor] = useState(secondCol);
    const [selectedField, setSelectedField] = useState('first');



    useEffect(() => {
        if (!preparedMotive) return;

        setFirstColor(preparedMotive.first);
        setSecondColor(preparedMotive.second)
    }, [preparedMotive, resetPreparedMotive])


    const handleSelectingField = (_id, fieldColor) => {
        const selected = fieldColor === firstColor ? 'first' : 'second';
        setSelectedField(selected);
    }


    return (
        <Container
        >
            <Row 
            className="mt-4 d-flex justify-content-center align-items-center">
          <Col 
          className="bg-primary-light d-flex flex-column justify-content-center align-items-center rounded mb-5 mb-md-0"
          xs={12} 
          md={6}
          >
          <Button  
          onClick={addUserMotive && (() => {
            addUserMotive({
                first: firstColor, 
                second: secondColor
            })})
             } 
          variant="secondary"
          >
              Dodaj do kolekcji
          </Button>
        <ColorMotive 
        onClick={handleSelectingField}
        className="mb-5"
        withoutPreview
        colors={{first: firstColor, second: secondColor}}
        style={{
            transformOrigin: 'top',
            transform: 'scale(3)'
        }}
        selectedField={selectedField}
        />
         </Col>
        
            <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center my-5 my-md-0"
            >
            {
                       selectedField === 'first' 
                       ?
                       <ChromePicker 
                       onChange={(color) => setFirstColor(color.hex)}
                       color={firstColor}
                       />
                       :
                       <ChromePicker 
                       onChange={(color) => setSecondColor(color.hex)}
                       color={secondColor}
                       />
            }
           
            </Col>
        
          </Row>
         
        </Container>
    )
}
