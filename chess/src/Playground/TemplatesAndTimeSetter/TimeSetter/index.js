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
  const {isGameTime} = useSelector(selectTime);


  const [time, setTime] = useState(0);
  const prevTime = useRef(null);


  const addTime = useCallback(() => {
    const timeObj = teams.reduce((result, {name}) => {
      result[name] = time * 60;
      return result;
    }, {})
    dispatch(timeAdded(timeObj));
  }, [dispatch, teams, time])


  useEffect(() => {
    if(!isGameTime || prevTime === time) return;
    debounce(() => {
      prevTime.current = time;
      addTime();
    }, 1000)
  }, [time, dispatch, teams, addTime, isGameTime])

 const handleChangeLocalTime = (e) => {
   let {value} = e.currentTarget;
   if(value > 90) {
     value = 90
   };
   if(value < 0) {
     value = 0;
   }
  setTime(value);
  }


  const toggleIsGameTime = () => {
    if (isGameTime) {
      dispatch(timeRemoved())
    } else {
      addTime();
    }
  }




    return (

          <Container className="mt-5 d-flex flex-column align-items-center ">
          <h6>
            Kliknij w piona, by wyłączyć czas w grze
          </h6>
          <PawnSwitch 
          isOn={isGameTime}
          onToggle={toggleIsGameTime}
          />
        <FormControl 
        className="mt-5 w-25"
        type="number"
        placeholder="0 - 60 min"
        aria-label="Set game time"
        min="0"
        max="60"
        value={time}
        onChange={handleChangeLocalTime}
        disabled={!isGameTime}
        />
         </Container> 
    )
  



  }
