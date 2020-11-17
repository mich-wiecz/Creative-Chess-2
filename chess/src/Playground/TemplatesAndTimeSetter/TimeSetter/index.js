import React, {useState, useEffect, useCallback, useRef} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import Container from 'react-bootstrap/Container';
import {timeAdded, timeRemoved, selectTeams, selectTime} from 'redux/chessSlice';
import {useSelector, useDispatch} from 'react-redux';
import debounce from 'lodash.debounce';

export default function TimeSetter() {

  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const {isTimeGame} = useSelector(selectTime);


  const [time, setTime] = useState(2);
  const prevTime = useRef(null);
  const debounceId = useRef(null);


  const addTime = () => {
    const timeObj = teams.reduce((result, {name}) => {
      result[name] = time * 60;
      return result;
    }, {})
    dispatch(timeAdded(timeObj));
  }


  const addTimeCallback = useCallback(debounce(
    () => {
    addTime()
    }, 1000)
  , [teams, time, dispatch])


  useEffect(() => {
    if(!isTimeGame || prevTime === time ) return;
    addTimeCallback()
   
  })

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


  const toggleIsTimeGame = () => {
    if (isTimeGame) {
      dispatch(timeRemoved())
    } else {
      addTime()
    }
  }




    return (

          <Container className="mt-5 d-flex flex-column align-items-center ">
          <h6>
            Kliknij w piona, by wyłączyć czas w grze
          </h6>
          <PawnSwitch 
          isOn={isTimeGame}
          onToggle={toggleIsTimeGame}
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
         </Container> 
    )
  



  }
