import {configureStore} from '@reduxjs/toolkit';
import chessReducer from 'redux/chessSlice';
import userReducer from 'redux/userSlice';
import {saveState, loadState} from './localStorage';
import throttle from 'lodash.throttle'

const store =  configureStore({
    reducer: {
        chess: chessReducer,
        user: userReducer
    },
    preloadedState: loadState()
})

store.subscribe(throttle(() => {
    saveState(store.getState())
}), 1000, {leading: true, trailing: false})


export default store;