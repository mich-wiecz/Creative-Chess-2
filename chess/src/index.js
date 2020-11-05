import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './global.scss';
import App from './App';
import ErrorBoundary from "utils/errors/ErrorBoundary";



ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ErrorBoundary entireAppLevel>
      <App />
    </ErrorBoundary>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

