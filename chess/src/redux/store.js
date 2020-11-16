import {configureStore} from '@reduxjs/toolkit';
import chessReducer from 'redux/chessSlice';
import userReducer from 'redux/userSlice';

export default configureStore({
    reducer: {
        chess: chessReducer,
        user: userReducer
    }
})