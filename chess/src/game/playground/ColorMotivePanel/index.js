import React, {useState, useEffect, useRef} from 'react';
// import ColorMotive from './ColorMotive';
import MotivesCollection from './MotivesCollection';
import MotivesCreator from './MotivesCreator';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import MyToast from '@global-components/MyToast';


const defaultMotives = [
    {first: 'white', second: 'black'}, 
    {first: 'transparent', second: 'orange'},
    {first: 'blue', second: 'purple'},
    {first: 'gold', second: 'darkgreen'},
    {first: 'gray', second: 'darkgreen'}       
    ]

export default function ColorMotivePanel () {

    const [userMotives, setUserMotives] = useState([{first: 'black', second: 'white'}]);
    const [activeMotive, setActiveMotive] = useState(false)
    const [showToast, setShowingToast] = useState(false);

   
    const localStoragePath = useRef('color-motives');
    const userMotivesLimit = useRef(10);



    useEffect(() => {
        if (activeMotive) setShowingToast(true);
    }, [activeMotive])


    useEffect(() => {
        const userMotives = JSON.parse(localStorage.getItem(localStoragePath.current));
        if(userMotives) setUserMotives(userMotives);
        const pathCopy = localStoragePath.current;
        return () => {
            localStorage.removeItem(pathCopy);
            localStorage.setItem(pathCopy, userMotives)
        }
    }, [userMotives])



    const changeActiveMotive = (id) => {    
    setActiveMotive(id)
    }



    const handleAddUserMotive = (newMotive) => {
        setUserMotives(prevArr => prevArr.concat(newMotive));
    }

    const deleteUserMotive = (selectedColorsObj) => {
        setUserMotives(prevArr => prevArr.filter(colorObj => {
            return !(colorObj.first === selectedColorsObj.first && colorObj.second === selectedColorsObj.second);
        }))
    }


    return (
        <>
<Tabs 
defaultActiveKey="collection" id="color-motives-sections" 
className="playground-tabs"  
> 
<Tab eventKey="collection" title="Kolekcja">
<MotivesCollection
defaultMotives={defaultMotives}
userMotives={userMotives}
addUserMotive={userMotives.length < userMotivesLimit && handleAddUserMotive}
deleteUserMotive={deleteUserMotive}
handleClickOnMotive={changeActiveMotive}
handleDoubleClickOnMotive={deleteUserMotive}
activeMotive={activeMotive}
/>
</Tab>
<Tab eventKey="creator" title="Stwórz własny" >
<MotivesCreator/>
</Tab>
</Tabs>


  <MyToast
         show={showToast} 
         onClose={() => setShowingToast(false)}
         delay={3000}
         autohide
        >
    Zmieniono motyw szachownicy!
        </MyToast>

     
</>
    )
}