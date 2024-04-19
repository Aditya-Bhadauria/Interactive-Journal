import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import './App.css';
import {LoginForm,SignupForm,Auth }from './App';
import  Navigation  from './Pages/navigation';
import Footer from './Pages/Footer';

import { Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    {/* <Navigation/> */}
    <App/>
    {/* <Footer/> */}
    
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
