import React, {useState, useEffect, useRef} from 'react';
// import ColorMotive from './ColorMotive';
import MotivesCollection from './MotivesCollection';
import MotivesCreator from './MotivesCreator';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useSelector, useDispatch} from 'react-redux';
import {selectBoardMotive, boardFeatureChanged} from 'redux/chessSlice';
import {defaultMotives} from 'chess/initialState'


export default function ColorMotivePanel () {


    const dispatch = useDispatch();

    const activeMotive = useSelector(selectBoardMotive);

    const [userMotives, setUserMotives] = useState([]);
    const [preparedMotive, setPreparedMotive] = useState(null);
    const [activeKey, setActiveKey] = useState('collection');

   
    // const localStoragePath = useRef('board-motives');
    const userMotivesLimit = useRef(10);
    const wereMotivesDownloaded = useRef(false);

    const isEnoughUserMotives  = userMotives.length >= userMotivesLimit.current ;

    
    const areTheSameMotive = (motiveOne, motiveTwo) => {
        return motiveOne.first === motiveTwo.first && motiveOne.second === motiveTwo.second;
    }


    useEffect(() => {

        if (!wereMotivesDownloaded.current) {
            const savedUserMotives = localStorage.getItem('userMotives');
            if (savedUserMotives) {
                setUserMotives(JSON.parse(savedUserMotives))
            }
            wereMotivesDownloaded.current = true;
        }
       
    }, [dispatch, userMotives])
     

    useEffect(() => {
          localStorage.setItem('userMotives', JSON.stringify(userMotives))
    }, [userMotives])

    useEffect(() => {

        if (isEnoughUserMotives) {
            setActiveKey('collection');
        }
    }, [userMotives, isEnoughUserMotives])



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