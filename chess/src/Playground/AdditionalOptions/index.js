import React, {useState, useEffect} from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import PawnSwitch from '@global-components/PawnSwitch';
import {useSelector, useDispatch} from 'react-redux';
import {boardFeatureChanged, selectBoardRotation} from 'redux/chessSlice';
import {useToasts} from 'contexts/ToastProvider';



  const InputSection = ({label, htmlFor, children}) => (
    <section className="mt-4 w-50">
    <label htmlFor={htmlFor}>{label}</label>
  <InputGroup className="mb-2 d-flex align-items-center">
    {children}
  </InputGroup>
    </section>
  )


  function RotationInput ({value, onChange}) {

    return (
      <>
      <InputGroup.Prepend>
      </InputGroup.Prepend>
      <FormControl
        placeholder="0 - 360"
        aria-label="Kąt nachylenia pól na szachownicy"
        type="number"
        min={0}
        max={360}
        value={value}
        onChange={onChange}
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
  const {fieldsRotation, boardRotation} = useSelector(selectBoardRotation);
  const dispatch = useDispatch();

const [showToast, createToast] = useToasts();
  useEffect(() => {
    createToast('rotation');
  })

  useEffect(() => {
    setLocalFieldsRotation(fieldsRotation);
  }, [fieldsRotation])

  useEffect(() => {
    setLocalBoardRotation(boardRotation);
  }, [boardRotation])




    return (
        <div className="d-flex flex-column w-75 justify-content-center align-items-center text-light" >

          <section className="border w-100 p-3 mb-3">
          <InputSection
          label="Kąt nachylenia pól na szachownicy"
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
        <Button 
    className="text-light" 
    variant="outline-dark"
    onClick={() => {
      showToast('rotation', "Zmieniłeś/aś kąty szachownicy")
      dispatch(boardFeatureChanged(['rotation', {
        fieldsRotation: localFieldsRotation,
        boardRotation: localBoardRotation
      }]))
    } }
    >
    Zatwierdź
    </Button>


    <Button 
    className="text-light" 
    variant="outline-dark"
    onClick={() => {
      showToast('rotation', "Przywróciłeś/aś domyślne kąty szachownicy")
      dispatch(boardFeatureChanged(['rotation', {
        fieldsRotation: 0,
        boardRotation: 0
      }]))
    }}
    >
      Zeruj
    </Button>
    </div>



        <InputSection
          label="Chronić figury przed łatwym usunięciem?"
          htmlFor="safeFigures"
          >
          <InputGroup.Prepend>
    </InputGroup.Prepend>
    <PawnSwitch isOn={true} className="ml-3"/>
        </InputSection>
        </div>
    )
}


