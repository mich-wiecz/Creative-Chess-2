import React from 'react';
import Button from 'react-bootstrap/Button';






export default  function ExecutivePanel ({
handleChangingBoardFieldSize,
resetToDefault,
}) {


    return (
<section className={`d-flex flex-column flex-md-row align-items-center justify-content-md-around` }>
<Button  
style={{
    width: 200
}}
onClick={() => {
resetToDefault()
} }>Przywróć domyślne
</Button>
<Button 
style={{
    width: 200
}}
onClick={() => {
handleChangingBoardFieldSize()
} } variant="maroon">
Zatwierdź
</Button>
</section>
    )
  }