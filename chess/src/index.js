import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './global.scss';
import App from './App';
import ErrorBoundary from "utils/errors/ErrorBoundary";
import {ToastProvider} from 'contexts/ToastProvider';
import {TranslationProvider} from 'contexts/TranslationProvider';
import {Provider} from 'react-redux';
import store from 'redux/store';







ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ErrorBoundary entireAppLevel>
      <Provider store={store}>
      <ToastProvider>
        <TranslationProvider>
      <App />
      </TranslationProvider>
      </ToastProvider>
      </Provider>
    </ErrorBoundary>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

