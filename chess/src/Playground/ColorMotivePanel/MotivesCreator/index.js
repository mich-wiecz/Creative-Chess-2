import React, {useState, useEffect} from 'react';
import ColorMotive from '../ColorMotive'
import ChromePicker from 'react-color/lib/Chrome'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useToasts} from 'contexts/ToastProvider';




export default function MotivesCreator({
    addUserMotive,
    preparedMotive,
    resetPreparedMotive
}) {


    const [showToast, createToast] = useToasts();

    const [firstColor, setFirstColor] = useState('#000');
    const [secondColor, setSecondColor] = useState('#fff');
    const [selectedField, setSelectedField] = useState('first');


    useEffect(() => {
     createToast('motive-added');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



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
     
            <Row className="mt-4 d-flex ">
          <Col 
          className="bg-primary-light d-flex flex-column justify-content-center align-items-center rounded"
          >
          <Button  
          onClick={addUserMotive && (() => {
              showToast('motive-added', "Dodałeś/aś nowy motyw");
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
        />
         </Col>
        
            <Col>
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
