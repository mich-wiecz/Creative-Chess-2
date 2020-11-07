import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';



export default function GameInfo({
turn,
madeMoves,
moveFor,
}) {


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
value={madeMoves}
/>
<Information 
title="Ruch dla"
value={moveFor === 'white' ? "Białych" : "Czarnych"}
/>
</ListGroup>
      )
}
