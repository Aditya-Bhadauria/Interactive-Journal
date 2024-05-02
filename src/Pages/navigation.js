import '../App';
import '../App.css';
import logo from '../images/ChronoLogLogo-removebg-preview.png';
import React, { useState, useEffect } from 'react';
import Modal from './Popup';
import { Link, useNavigate } from 'react-router-dom';
import HomePage from './Home';
import Journal from './Journal';
import Task from './Task';
import { Fade, ScaleFade, Slide, SlideFade, Collapse, useDisclosure, Button, Box, Lorem, ChakraProvider } from '@chakra-ui/react';
import Swal from 'sweetalert2'; // Import SweetAlert2

function SlideEx() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>Click Me</Button>
      <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          <h1>Hello Guys HOw Are yu</h1>
        </Box>
      </Slide>
    </>
  );
}

function Navigation() {
  const [username, setUsername] = useState(null); // Store username from sessionStorage
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername);
  }, []); // Get username on component mount

  const handleLogout = async () => {
    sessionStorage.removeItem('username');
    try {
      const response = await fetch('http://localhost:5000/logout', { // Replace with your logout endpoint URL
        method: 'POST',
        // Optionally include a JWT or other authentication token in the headers
      });
      const data = await response.json();
      if (data.message === 'Logout successful') {
        // Handle successful logout
        setUsername(null); // Clear username state
        window.history.pushState({}, document.title, window.location.href);
        // Display success alert using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error('Logout failed:', data.message);
        // Handle logout failure (optional: display error message)
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle logout error (optional: display error message)
    }
  };

  return (
    <>
      <ChakraProvider>
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
                <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
              </li>
              <li className="nav-item">
                {username ? (
                  <Link className="nav-link" onClick={handleLogout}>Logout ({username})</Link>
                ) : (
                  <a className="nav-link" onClick={openModal} style={{ cursor: 'pointer' }}>Login</a>
                )}
              </li>
              {/* Only show the "About" link when user is logged in */}
              {username && (
                <li className="nav-item">
                  <Link className="nav-link" to="/journal"> Global Journals</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Modal show={showModal} close={closeModal} />
      </ChakraProvider>
    </>
  );
}

export default Navigation;


