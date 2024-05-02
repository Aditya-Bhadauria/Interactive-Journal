import React, { useState } from 'react';
import '../App.css'; 
import Swal from 'sweetalert2';

import axios from 'axios';
const Modal = ({ show, close, onLoginSuccess }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/login', { 
        email,
        password, 
      });
  
      if (response.status === 200) {
        
  //       console.log('Login successful!');
  //       const username = response.data.user.username; 
        

  //       close();

      
  //     alert('User successfully logged in!');

      
  //     setEmail('');
  //     setPassword('');


  //       const jwtToken = response.data.token;
  //       sessionStorage.setItem('username', username);
  //       sessionStorage.setItem('jwtToken', jwtToken);
  //       // console.log(`username${username}`);
  //       // console.log(`jwttoken${jwtToken}`);
  //       window.location.href = window.location.href;
        
  //       if (onLoginSuccess) {
  //         onLoginSuccess(response.data); 
          

  //       } else {
          
  //       }
  //     } else {
  //       setErrorMessage('Login failed. Please check your credentials.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage('An error occurred. Please try again later.');
  //   }
  // };
  console.log('Login successful!');
  const username = response.data.user.username;
  const jwtToken = response.data.token;

  close();

  Swal.fire({
    icon: 'success',
    title: 'Login Successful!',
    text: `Welcome back, ${username}`,
  }).then(() => {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('jwtToken', jwtToken);
    window.location.href = window.location.href;

    if (onLoginSuccess) {
      onLoginSuccess(response.data);
    }
  });
} else {
  setErrorMessage('Login failed. Please check your credentials.');
  Swal.fire({
    icon: 'error',
    title: 'Login Failed!',
    text: 'Invalid email or password.',
  });
}
} catch (error) {
console.error(error);
setErrorMessage('An error occurred. Please try again later.');
Swal.fire({
  icon: 'error',
  title: 'Error!',
  text: 'An error occurred during login.',
});
}
};
  

  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={close}>×</span>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

