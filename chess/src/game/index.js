import React, {useState, lazy, Suspense} from 'react';
import { IsolatedRoute, WaitingModal } from "utils/routing";
import EndGameModal from './EndGameModal';
import GameBar from './GameBar';
import Playground from 'Playground';

const Options = lazy('./Options');


// {/* <TimerSVG 
// style={{
//   position: 'absolute',
//   top: '20%',
//   left: '50%',
//   transform: 'translateX(-50%)'

// }}
// className={`mx-auto`}
// time={{
//   player1: 0,
//   player2: 0
// }}
// moveFor="black"
// isGameOver={false}
// isGameOn={false}
// /> */}

export default function Game() {
    return (
      <>
      {
          true &&
          <GameBar />
      }
     
      {/* <EndGameModal 
      show={showEndGameModal}
      onClose={() => setShowEndGameModal(false)}
      winner="white"
      reason="time"
    /> */}
      <IsolatedRoute path="/options">
        <Suspense fallback={WaitingModal}>
      <Options />
      </Suspense>
      </IsolatedRoute>

        <Playground isGameOn={true}>

        </Playground>
      </>
    )
}
