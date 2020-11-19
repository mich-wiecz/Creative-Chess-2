import React, {useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {timeAdded, timeRemoved, selectTeams} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';


const initialTime = 2;

export default function TimeSetter({
  showToast
}) {

  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);


  const [time, setTime] = useState(initialTime);
  const [timeBlocked, setTimeBlocked] = useState(true);


  const addTime = () => {
    const timeObj = teams.reduce((result, {name}) => {
      result[name] = time * 60;
      return result;
    }, {})
    dispatch(timeAdded(timeObj));
    showToast(`Czas gry to ${time} minut dla każdego gracza`)
  }


 const handleChangeLocalTime = (e) => {
   let {value} = e.currentTarget;
   if(value > 90) {
     value = 90
   };
   if(value < 0) {
     value = 2;
   }
  setTime(value);
  }


  const toggleTimeBlocked = () => {
   if (timeBlocked) {
     setTimeBlocked(false)
   } else {
     setTimeBlocked(true)
     dispatch(timeRemoved())
   }
  }




    return (

          <Container className="mt-5 d-flex flex-column align-items-center ">
          <h6>
            Kliknij w piona, by wyłączyć czas w grze
          </h6>
          <PawnSwitch 
          isOn={!timeBlocked}
          onToggle={toggleTimeBlocked}
          />
        <FormControl 
        className="mt-5 w-25"
        type="number"
        placeholder="2 - 60 min"
        aria-label="Set game time"
        min="2"
        max="60"
        value={time}
        onChange={handleChangeLocalTime}
        />
        <Button disabled={timeBlocked} onClick={addTime} className="w-25 mt-2 bg-secondary" >
          Zatwierdź
        </Button>
         </Container> 
    )
  



  }
