import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './global.scss';
import App from './App';
import ErrorBoundary from "utils/errors/ErrorBoundary";
import {ToastProvider} from 'contexts/ToastProvider';
import {Provider} from 'react-redux';
import store from 'redux/store';
import {getUserData, logout} from 'redux/userSlice';
import jwtDecode from 'jwt-decode';
import axios from 'axios';


axios.defaults.baseURL = "https://europe-west1-creative-chess.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
if (decodedToken.exp * 1000 < Date.now()) {
  store.dispatch(logout());
} else {
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch(getUserData());
}
}



ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ErrorBoundary entireAppLevel>
      <Provider store={store}>
      <ToastProvider>
      <App />
      </ToastProvider>
      </Provider>
    </ErrorBoundary>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

