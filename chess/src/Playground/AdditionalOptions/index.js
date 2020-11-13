import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import PawnSwitch from 'Playground/TemplatesAndTimeSetter/node_modules/@global-components/PawnSwitch';

  const InputSection = ({label, htmlFor, children}) => (
    <section className="mt-4 w-50">
    <label htmlFor={htmlFor}>{label}</label>
  <InputGroup className="mb-2">
    {children}
  </InputGroup>
    </section>
  )


export const AdditionalOptions = () => {
    return (
        <div className="d-flex flex-column w-75 justify-content-center align-items-center text-light" >
          <InputSection
          label="Nachylenie szachownicy"
          htmlFor="rotation"
          >
          <InputGroup.Prepend>
    <Button className="text-light" variant="outline-light">
    Zatwierdź
    </Button>
    </InputGroup.Prepend>
    <FormControl
      placeholder="0 - 360"
      aria-label="Kąt nachylenia szachownicy"
      type="number"
      min={0}
      max={360}
    />
     <InputGroup.Append>
     <InputGroup.Text>
     &#176;
     </InputGroup.Text>
     </InputGroup.Append>
        </InputSection>


        <InputSection
          label="Chronić figury przed łatwym usunięciem?"
          htmlFor="safeFigures"
          >
          <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            TAK
            </InputGroup.Text>
    </InputGroup.Prepend>
    <PawnSwitch isOn={true}/>
        </InputSection>
        </div>
    )
}


