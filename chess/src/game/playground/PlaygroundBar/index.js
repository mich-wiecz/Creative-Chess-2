import React from 'react';
import {Dropdown,  DropdownToggle, DropdownMenu, DropdownHeader, DropdownItem} from '@global-components/GameDropdown';
import TimeTravelButtons from '@global-components/TimeTravelButtons';
import FireButton from '@global-components/FireButton';
import MainBar from '@global-components/MainBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function PlaygroundBar() {


  function PlaygroundMenu ({...props}) {
    return (
      <Dropdown
      id="resetOptions"
      menuRole="Głównie opcje resetowania"
      {...props}
    >
      <DropdownToggle  
      className="bg-maroon"
      />
      <DropdownMenu >
      <DropdownHeader 
className="font-weight-bold"
>
Manipulacje szachownicy
<p className="whisper font-weight-light">
  (Rozpoczęcie gry usuwa historię i uniemożliwia ich późniejsze cofnięcie)
</p>
</DropdownHeader>
<DropdownItem 
className="bg-primary text-light">
  Cofnij wszystkie zmiany</DropdownItem>
<DropdownHeader>Gra</DropdownHeader>
<DropdownItem 
className="bg-primary text-light">
  Resetuj do ustawień domyślnych
  </DropdownItem>
<DropdownItem 
className="bg-primary text-light">
  Zacznij od początku
  </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    )
  }


    return (
      <MainBar>
        <ButtonGroup className="w-100">
       <PlaygroundMenu />
      <TimeTravelButtons />
      <FireButton>
      Rozpocznij grę 
      </FireButton>
      </ButtonGroup>
      </MainBar>
      
    )
}
