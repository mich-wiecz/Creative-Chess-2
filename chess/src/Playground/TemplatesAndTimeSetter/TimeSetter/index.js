import React, {useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import UserOptions from '@global-components/UserOptions';
import ShortField from '@global-components/ShortField';
import {timeAdded, timeRemoved, selectTeams, selectTime} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';
import clamp from '@global-functions/clamp';


const initialTime = 2,
minTime = 0,
maxTime = 90;

export default function TimeSetter() {

  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const {isTimeGame, timeStarted} = useSelector(selectTime);


  const [time, setTime] = useState(initialTime);
  const [showWarning, setShowWarning] = useState(false);


  const addTime = () => {
    const timeObj = teams.reduce((result, {name}) => {
      result[name] = time * 60;
      return result;
    }, {})
    dispatch(timeAdded(timeObj));
  }


 const handleChangeLocalTime = (e) => {
   let {value} = e.currentTarget;
   value = clamp(value, minTime, maxTime);
  setTime(value);
  }


  const toggleTimeInGame = () => {
   if (isTimeGame) {
    dispatch(timeRemoved())
   } else {
    addTime();
   }
  }




    return (
           <>
          <Container className="mt-5 d-flex flex-column align-items-center ">
          <h6 className="mb-4">
        Kliknij w piona, by 
        {" "}
            <strong 
           className="text-secondary"
            >
            włączyć / wyłączyć
            {" "}
            </strong>
         czas w grze
          </h6>
          <PawnSwitch 
          isOn={isTimeGame}
          onToggle={toggleTimeInGame}
          />
          <Col
          xs={8}
          md={4}
          className="d-flex flex-column align-items-center"
          >
            <ShortField>
        <FormControl 
        className="mt-5"
        type="number"
        placeholder={`${minTime} - ${maxTime} min`}
        aria-label="Set game time"
        min={minTime}
        max={maxTime}
        value={time}
        onChange={handleChangeLocalTime}
        />
        </ShortField>
        <ShortField>
        <Button 
        disabled={!isTimeGame} 
        onClick={() => {
          if (timeStarted) {
            setShowWarning(true)
          } else {
            addTime()
          }
        }} 
        className=" w-100 mt-2 bg-secondary" 
        >
          Zatwierdź
        </Button>
        </ShortField>
        </Col>
         </Container> 
         {
           showWarning &&
           <UserOptions.Modal
           show={true}
           onHide={() => setShowWarning(false)}
           title={"Aktualny czas zostanie utracony. Na pewno tego chcesz?"}
           > 
             <UserOptions.Option>
               <Button 
               className="w-100"
               onClick={() => {
                 addTime();
                 setShowWarning(false);
               }}>
                 Tak
               </Button>
             </UserOptions.Option>
             <UserOptions.Option>
               <Button 
               className="w-100"
               onClick={() => setShowWarning(false)}>
                 Nie
               </Button>
             </UserOptions.Option>
           </UserOptions.Modal>
         }
       
         </>
    )
  



  }
