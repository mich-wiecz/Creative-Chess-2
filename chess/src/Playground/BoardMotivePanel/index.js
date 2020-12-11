import React, {useState, useEffect} from 'react';
// import ColorMotive from './ColorMotive';
import MotivesCollection from './MotivesCollection';
import MotivesCreator from './MotivesCreator';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useSelector, useDispatch} from 'react-redux';
import {selectBoardMotive, boardFeatureChanged} from 'redux/chessSlice';
import {defaultMotives} from 'chess/initialState'

const userMotivesLimit = 10;

export default function ColorMotivePanel () {


    const dispatch = useDispatch();

    const activeMotive = useSelector(selectBoardMotive);

    const [userMotives, setUserMotives] = useState(() => {
            const savedUserMotives = localStorage.getItem('userMotives');
                return savedUserMotives 
                ? 
                JSON.parse(savedUserMotives) 
                : 
                [];

    });
    const [preparedMotive, setPreparedMotive] = useState(null);
    const [activeKey, setActiveKey] = useState('collection');

   
    

    const isEnoughUserMotives  = userMotives.length >= userMotivesLimit;

    
    const areTheSameMotive = (motiveOne, motiveTwo) => {
        return motiveOne.first === motiveTwo.first && motiveOne.second === motiveTwo.second;
    }
     

    useEffect(() => {

        if (isEnoughUserMotives) {
            setActiveKey('collection');
        }
    }, [userMotives, isEnoughUserMotives])



    const changeActiveMotive = (newMotive) => dispatch(boardFeatureChanged(['boardMotive', newMotive]));

    const handleAddUserMotive = (newMotive) => {
        const duplicateId = userMotives.findIndex(motive => areTheSameMotive(motive, newMotive));

        if(duplicateId !== -1) return; 

        const updatedMotives = userMotives.concat(newMotive);
        setUserMotives(updatedMotives);
        localStorage.setItem('userMotives', JSON.stringify(updatedMotives))
       
    }

    const deleteUserMotive = (selectedMotive) => {
        setUserMotives(prevArr => prevArr.filter(motive => {
            return !areTheSameMotive(selectedMotive, motive);
        }))
    }



    const prepareNewMotive = (selectedMotive) => {
        setPreparedMotive(selectedMotive);
        setActiveKey('creator')
    }


    const resetPreparedMotive = () => {
        setPreparedMotive(null)
    }

  

    return (
        <>
<Tabs 
activeKey={activeKey}
onSelect={key => setActiveKey(key)}
id="color-motives-sections" 
className="playground-tabs"  
> 
<Tab eventKey="collection" title="Kolekcja">
<MotivesCollection
areTheSameMotive={areTheSameMotive}
changeActiveMotive={changeActiveMotive}
defaultMotives={defaultMotives}
userMotives={userMotives}
deleteUserMotive={deleteUserMotive}
prepareNewMotive={prepareNewMotive}
activeMotive={activeMotive}
isEnoughUserMoves={isEnoughUserMotives}
/>
</Tab>
<Tab eventKey="creator" title={`Stwórz własny ${isEnoughUserMotives ? "(Przekroczono limit)" : ""}`} disabled={isEnoughUserMotives}>
<MotivesCreator
addUserMotive={handleAddUserMotive}
preparedMotive={preparedMotive}
resetPreparedMotive={resetPreparedMotive}
/>
</Tab>
</Tabs>

</>
    )
}