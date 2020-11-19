import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import PawnSwitch from '@global-components/PawnSwitch';
import classes from '../BoardFieldResizer.module.scss';

import ListGroup from 'react-bootstrap/ListGroup';



export default     function ResizingOptions({
    areProportionsKept,
    toggleProportionsKeeping,
    actualUnit,
    handleUnitsChange
}) {
    return (
      <section className={`text-dark p-md-0 pt-5`} style={{minWidth: 240}}>
      <ListGroup>
        <ListGroup.Item>
        <div>
          <span >
            {areProportionsKept
              ? "Proporcje zachowywane"
              : "Bez zachowywania proporcji"}
          </span>
          <PawnSwitch
            className={`mx-auto mt-2`}
            isOn={areProportionsKept}
            onToggle={toggleProportionsKeeping}
          />
        </div>
    </ListGroup.Item>
    <ListGroup.Item>
    <div >
          <p>Aktualne jednostki:</p>
          <FormControl
            as="select"
            value={actualUnit}
            onChange={handleUnitsChange}
            className={classes.UnitSelector}
          >
            <option value="mm">mm</option>
            <option value="px">px</option>
            <option value="in">in</option>
          </FormControl>
        </div>
</ListGroup.Item>
  </ListGroup>


      </section>
    )
  }