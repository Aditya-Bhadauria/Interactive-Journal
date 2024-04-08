
import './App.css';
import logo from './images/ChronoLogLogo-removebg-preview.png'
import { useState,useEffect } from 'react';
import { Offcanvas, Nav} from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-bootstrap';
import Image1 from './images/Samurai1.jpg'
import Image2 from './images/Samurai2.jpg'
import Image3 from './images/Samurai3.jpg'

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home'; // Import your page components
import Journal from './Pages/Journal';
import Task from './Pages/Task';
import SignupLogin from './Pages/LoginPage';
// import HomePage from './Pages/Home';
import Navigation from './Pages/navigation';
const App = () => {
  return (
    <BrowserRouter>
    <Navigation/>
       <Routes>
        <Route path="/" element={<HomePage />} />  {/* Map paths to components */}
        <Route path="/Journal" element={<Journal />} />
        <Route path="/task" element={<Task />} />
        <Route path="/Login" element={<SignupLogin />} />

      </Routes> 
    </BrowserRouter>
  );
};

export default App;








