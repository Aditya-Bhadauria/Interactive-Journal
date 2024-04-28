import '../App';
import '../App.css'
import logo from '../images/ChronoLogLogo-removebg-preview.png'
import React, { useState } from 'react';
import Modal from './Popup';
import { Link } from 'react-router-dom';
import HomePage from './Home';
import Journal from './Journal';
import Task from './Task';
import { Element, animateScroll as scroll } from 'react-scroll';

function Navigation() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSmoothScroll = (id) => {
    // Optional: Add offset for header or navigation bar height
    scroll.scrollTo({
      containerId: 'main-content', // Adjust if needed
      duration: 500, // Customize scroll duration
      smooth: 'easeInOutQuad', // Choose animation type from react-scroll options
      offset: -50, // Adjust offset for header/navigation height
      id: id,
    });
  };


  return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" style={{ height: '45px', marginRight: '10px' }} />
          
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={openModal} style={{ cursor: 'pointer' }}>Login/SignUp</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link"onClick={() => handleSmoothScroll('content1')}>Journal</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/task">My Tasks</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Modal show={showModal} close={closeModal} />
    
    </>
  );
}

export default Navigation;
