import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {selectStatistics} from 'redux/chessSlice';
import {useSelector} from 'react-redux';



export default function GameInfo() {


  const {turn, movesDone, moveFor} = useSelector(selectStatistics);


  function Information ({title, value}) {
    return (
      <ListGroup.Item>
      <span className="pr-2">
        {title}:
      </span>
      <span className="font-weight-bold">
        {value}
      </span>
    </ListGroup.Item>
    )
  }


    return (
      <ListGroup className="text-dark">
<Information 
title="Tura"
value={turn}
/>
<Information 
title="Wykonane ruchy"
value={movesDone}
/>
<Information 
title="Ruch dla"
value={moveFor === 'white' ? "Białych" : "Czarnych"}
/>
</ListGroup>
      )
}
