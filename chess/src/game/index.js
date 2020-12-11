import React, {useState} from 'react';
import GameBar from './GameBar';
import PlaygroundBar from '../Playground/PlaygroundBar'
import Playground from '../Playground';
import Board from 'Game/Board';
import windowDimensions from 'react-window-dimensions';
import {selectMode} from 'redux/chessSlice';
import {useSelector} from 'react-redux';


const widthBreakpoint = 768;

 function Game({
   windowWidth
  }) {

  const [isMobilePlaygroundOn, setIsMobilePlaygroundOn] = useState(false);

  const handleSettingIsMobilePlaygroundOn = (value) => setIsMobilePlaygroundOn(value);

  const mobileVersion = windowWidth < widthBreakpoint;

  const mode = useSelector(selectMode),
   isGameOn = mode === 'game';


    return (
      <div>
      {
        !isMobilePlaygroundOn &&
          (isGameOn 
          ?
          <GameBar />
          :
          <PlaygroundBar />)
      }

        <Playground 
        mobileVersion={mobileVersion}
        windowWidth={windowWidth}
        isMobilePlaygroundOn={isMobilePlaygroundOn}
        setIsMobilePlaygroundOn={handleSettingIsMobilePlaygroundOn}
        isGameOn={isGameOn}>
          <Board isGameOn={isGameOn}/>
        </Playground>
      </div>
    )
}

export default windowDimensions({
  take: () => ({windowWidth: window.innerWidth}),
  // debounce: onResize => debounce(onResize, 200)
})(Game);
