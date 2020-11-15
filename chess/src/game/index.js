import React, { lazy, Suspense} from 'react';
import { IsolatedRoute, WaitingModal } from "utils/routing";
import GameBar from './GameBar';
import Playground from '../Playground';
import Board from 'Game/Board';
import {selectMode} from 'redux/chessSlice';
import {useSelector} from 'react-redux';

const Options = lazy('./Options');


export default function Game() {


  const mode = useSelector(selectMode),
   isGameOn = mode === 'game';

    return (
      <>
      {
          isGameOn && <GameBar />
      }
    
      <IsolatedRoute path="/options">
        <Suspense fallback={WaitingModal}>
      <Options />
      </Suspense>
      </IsolatedRoute>

        <Playground isGameOn={isGameOn}>
          <Board isGameOn={isGameOn}/>
        </Playground>
      </>
    )
}
