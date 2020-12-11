import React, {useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PawnSwitch from '@global-components/PawnSwitch';
import { useDispatch} from 'react-redux';
import {boardFeatureChanged} from 'redux/chessSlice';



  const InputSection = ({label, htmlFor, children}) => (
    <Col 
    className="mt-4"
    xs={12}
    >
    <label htmlFor={htmlFor}>{label}</label>
  <InputGroup className="mb-2 d-flex align-items-center">
    {children}
  </InputGroup>
    </Col>
  )


  function SubmitButton ({
    onClick,
    text
  }) {
    return (
      <Button 
      className="text-light" 
      variant="outline-dark"
      onClick={onClick}
      >
     {text}
      </Button>
    )
  }


  function RotationInput ({value, onChange}) {

    return (
      <>
      <FormControl
        placeholder="0 - 360"
        aria-label="Kąt nachylenia pól na szachownicy"
        type="number"
        min={0}
        max={360}
        value={value}
        onChange={onChange}
        style={{
          maxWidth: 100
        }}
      />
       <InputGroup.Append>
       <InputGroup.Text>
       &#176;
       </InputGroup.Text>
       </InputGroup.Append>
       </>
    )
  }


export default function AdditionalOptions () {

  const [localBoardRotation, setLocalBoardRotation] = useState(0);
  const [localFieldsRotation, setLocalFieldsRotation] = useState(0);
  const dispatch = useDispatch();



    return (
        <Container 
        className="mt-5 d-flex flex-column justify-content-center align-items-start text-light" >
<Row className="w-100">
     <Col 
     xs={12} 
     sm={10} 
     md={8} 
     lg={7} 
     xl={6}
     >
      <section className="p-3 mb-3">
          <InputSection
          label="Nachylenie pól na szachownicy"
          htmlFor="fields-rotation"
          >
            <RotationInput 
            value={localFieldsRotation}
            onChange={(e) => setLocalFieldsRotation(e.currentTarget.value)}
            />
        </InputSection>


        <InputSection
          label="Nachylenie szachownicy"
          htmlFor="board-rotation"
          >
       <RotationInput 
            value={localBoardRotation}
            onChange={(e) => setLocalBoardRotation(e.currentTarget.value)}
            />
        </InputSection>
        </section>


      <div className="d-flex w-75 justify-content-around">   


 <SubmitButton 
onClick={() => {
  dispatch(boardFeatureChanged(['rotation', {
    fieldsRotation: 0,
    boardRotation: 0
  }]))
}}
text="Zeruj"
/>          
<SubmitButton 
onClick={() => {
  dispatch(boardFeatureChanged(['rotation', {
    fieldsRotation: localFieldsRotation,
    boardRotation: localBoardRotation
  }]))
} }
text={"Zatwierdź"}
/>

  </div>
  </Col>
  </Row>

<div className="w-100 my-4 border-bottom"/>


<Row>
  <Col>
        <InputSection
          label="Chronić figury przed łatwym usunięciem?"
          htmlFor="safeFigures"
          >
          <InputGroup.Prepend>
    </InputGroup.Prepend>
    <PawnSwitch isOn={true} className="ml-3"/>
        </InputSection>
        </Col>
    </Row>
        </Container>
    )
}


