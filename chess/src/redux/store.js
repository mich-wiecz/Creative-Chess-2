import {configureStore} from '@reduxjs/toolkit';
import chessReducer from 'redux/chessSlice';


export default configureStore({
    reducer: {
        chess: chessReducer
    }
})