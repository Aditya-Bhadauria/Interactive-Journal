
import './App.css';
import logo from './images/ChronoLogLogo-removebg-preview.png'
import {useEffect } from 'react';
import { Offcanvas, Nav} from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-bootstrap';
import Image1 from './images/Samurai1.jpg'
import Image2 from './images/Samurai2.jpg'
import Image3 from './images/Samurai3.jpg'

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import HomePage from './Pages/Home'; // Import your page components
import Journal from './Pages/Journal';
import Task from './Pages/Task';
import SignupLogin from './Pages/LoginPage';
// import HomePage from './Pages/Home';
import Navigation from './Pages/navigation';
import Footer from './Pages/Footer';
import MyForm from './Pages/BackendTest'; 
import { Drawer } from '@chakra-ui/react';
import DrawerExample from './Pages/SignUp';
import SignUp from './Pages/SignUp';


const App = () => {
  return (
    <BrowserRouter>
      <Navigation />  {/* Navigation component outside of Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Map paths to components */}
        <Route path="/Journal" element={<Journal />} />
        <Route path="/task" element={<Task />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;








