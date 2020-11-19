import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import classes from '../BoardFieldResizer.module.scss';
import {useToasts} from 'contexts/ToastProvider';





export default  function ExecutivePanel ({
handleChangingBoardFieldSize,
resetToDefault,
handleSettingMinSize
}) {



    const [showToast, createToast] = useToasts();


    useEffect(() => {
     createToast('one');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
<section className={classes.BtnGroup}>
<Button  onClick={() => {
showToast('one', "Przywróciłeś/aś domyślny rozmiar pól")
resetToDefault()
} }>Przywróć domyślne</Button>
<Button onClick={handleSettingMinSize}>Rozmiar minimalny</Button>
<Button onClick={() => {
showToast('one', "Zmieniłeś/aś rozmiar pól.")
handleChangingBoardFieldSize()
} } variant="maroon">
Zatwierdź
</Button>
</section>
    )
  }