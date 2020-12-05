import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import {selectStatistics} from 'redux/chessSlice';
import {useSelector} from 'react-redux';

function Information ({title, value}) {
  return (
    <ListGroup.Item 
    as={Col}
    style={{
      minWidth: 200
    }}
    md={6}
    xs={12}
    >
    <span className="pr-2">
      {title}:
    </span>
    <span className="font-weight-bold">
      {value}
    </span>
  </ListGroup.Item>
  )
}

export default function GameInfo() {


  const {turn, movesDone, moveFor} = useSelector(selectStatistics);


    return (
      <div 
      className="text-dark d-flex flex-wrap"
      >
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
</div>
      )
}
