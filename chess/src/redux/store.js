import {configureStore} from '@reduxjs/toolkit';
import chessReducer from 'redux/chessSlice';
import userReducer from 'redux/userSlice';
import {saveState, loadState} from './localStorage';
import throttle from 'lodash.throttle'
import { logout} from 'redux/userSlice';
import jwtDecode from 'jwt-decode';
import axios from 'axios';





const store =  configureStore({
    reducer: {
        chess: chessReducer,
        user: userReducer
    },
    preloadedState: loadState()
})


axios.defaults.baseURL = "https://europe-west1-creative-chess.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
if (decodedToken.exp * 1000 < Date.now()) {
  store.dispatch(logout());
} else {
  axios.defaults.headers.common['Authorization'] = token;
}
}



store.subscribe(throttle(() => {
    saveState(store.getState())
}), 1000, {leading: true, trailing: false})


export default store;