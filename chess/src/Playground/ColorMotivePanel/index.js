import React, {useState, useEffect, useRef} from 'react';
// import ColorMotive from './ColorMotive';
import MotivesCollection from './MotivesCollection';
import MotivesCreator from './MotivesCreator';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useSelector, useDispatch} from 'react-redux';
import {selectBoardFeatures, boardFeatureChanged} from 'redux/chessSlice';
import {defaultMotives} from 'chess/initialState'



export default function ColorMotivePanel () {


    const dispatch = useDispatch();

    const {boardMotive: activeMotive} = useSelector(selectBoardFeatures);

    const [userMotives, setUserMotives] = useState([]);
    const [preparedMotive, setPreparedMotive] = useState(null);
    const [activeKey, setActiveKey] = useState('collection');

   
    const localStoragePath = useRef('color-motives');
    const userMotivesLimit = useRef(10);


    
    const areTheSameMotive = (motiveOne, motiveTwo) => {
        return motiveOne.first === motiveTwo.first && motiveOne.second === motiveTwo.second;
    }


    useEffect(() => {
        const userMotives = JSON.parse(localStorage.getItem(localStoragePath.current));
        if(userMotives) setUserMotives(userMotives);
        const pathCopy = localStoragePath.current;
        return () => {
            localStorage.removeItem(pathCopy);
            localStorage.setItem(pathCopy, userMotives)
        }
    }, [userMotives])



    const changeActiveMotive = (newMotive) => dispatch(boardFeatureChanged(['boardMotive', newMotive]));

    const handleAddUserMotive = (newMotive) => {
        const duplicateId = userMotives.findIndex(motive => areTheSameMotive(motive, newMotive));
        if(duplicateId !== -1) return; 
        setUserMotives(prevArr => prevArr.concat(newMotive));
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

   const isEnoughUserMoves  = userMotives.length > userMotivesLimit.current;

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
isEnoughUserMoves={isEnoughUserMoves}
/>
</Tab>
<Tab eventKey="creator" title="Stwórz własny" >
<MotivesCreator
addUserMotive={!isEnoughUserMoves && handleAddUserMotive}
preparedMotive={preparedMotive}
resetPreparedMotive={resetPreparedMotive}
/>
</Tab>
</Tabs>

</>
    )
}