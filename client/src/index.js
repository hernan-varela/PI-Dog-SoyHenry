import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"  // me permite conectar react con redux
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>  
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </Provider> //abrazo mi app con provider y ble asigno la store
    ,document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//ahora voy a app.js y configuro browser router
