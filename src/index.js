import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/global.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.bubble.css';
import './utils/socketio';


ReactDOM.render(
  <React.StrictMode>
       <App />
  </React.StrictMode>,
  document.getElementById('root')
);
