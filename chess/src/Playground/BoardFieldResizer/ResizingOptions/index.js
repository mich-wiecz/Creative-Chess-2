import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import ShortField from '@global-components/ShortField';
import ListGroup from 'react-bootstrap/ListGroup';



export default     function ResizingOptions({
    areProportionsKept,
    toggleProportionsKeeping,
    actualUnit,
    handleUnitsChange
}) {
    return (
      <section className={`text-dark mt-4 mt-md-2  mt-lg-0 p-lg-0 pt-5 mx-auto`} style={{
        minWidth: 240,
        maxWidth: 400
        }}>
      <ListGroup>
        <ListGroup.Item>
        <div>
          <span >
            {areProportionsKept
              ? "Proporcje zachowywane"
              : "Bez zachowywania proporcji"}
          </span>
          <PawnSwitch
            className={`ml-2 mt-2`}
            isOn={areProportionsKept}
            onToggle={toggleProportionsKeeping}
          />
        </div>
    </ListGroup.Item>
    <ListGroup.Item>
    <div >
          <p>Aktualne jednostki:</p>
          <ShortField>
          <FormControl
            as="select"
            value={actualUnit}
            onChange={handleUnitsChange}
          >
            <option value="mm">mm</option>
            <option value="px">px</option>
            <option value="in">in</option>
          </FormControl>
          </ShortField>
        </div>
</ListGroup.Item>
  </ListGroup>


      </section>
    )
  }