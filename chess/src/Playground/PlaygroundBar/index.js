import React from 'react';
import {Dropdown,  DropdownToggle, DropdownMenu, DropdownHeader, DropdownItem} from '@global-components/GameDropdown';
import TimeTravelButtons from '@global-components/TimeTravelButtons';
import FireButton from '@global-components/FireButton';
import MainBar from '@global-components/MainBar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector} from 'react-redux';
import {gameResetedToDefault, gameResetedToInitial, gameActivated, selectStatistics} from 'redux/chessSlice';

function PlaygroundMenu ({...props}) {

  const dispatch = useDispatch();

  return (
    <Dropdown
    id="resetOptions"
    menurole="Głównie opcje resetowania"
    {...props}
    style={{
      position: 'relative',
      zIndex: 900
    }}
  >
    <DropdownToggle  
    className="bg-maroon h-100"
     style={{
       width: 50
     }}
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
disabled
className="bg-primary text-light">
Cofnij wszystkie zmiany
</DropdownItem>
<DropdownHeader>Gra</DropdownHeader>
<DropdownItem 
onClick={() => dispatch(gameResetedToDefault())}
className="bg-primary text-light">
Resetuj do ustawień domyślnych
</DropdownItem>
<DropdownItem 
onClick={() => dispatch(gameResetedToInitial())}
className="bg-primary text-light"
>
Zacznij od początku
</DropdownItem>
    </DropdownMenu>
  </Dropdown>
  )
}






export default function PlaygroundBar() {

  const dispatch = useDispatch();
  const {movesDone} = useSelector(selectStatistics);


    return (
      <MainBar>
        <ButtonGroup className="w-100 pt-2">
       <PlaygroundMenu />
      <TimeTravelButtons disabled/>
      <FireButton onClick={
        () =>  dispatch(gameActivated())}>
       {movesDone === 0 ? "Start" : "Wznów"} 
      </FireButton>
      </ButtonGroup>
      </MainBar>
      
    )
}
