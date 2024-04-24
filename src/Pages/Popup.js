import React, { useState } from 'react';
import '../App.css'; // Make sure to create this CSS file for styling

// const Modal = ({ show, close }) => {
//   return (
//     <div className="modal" style={{ display: show ? 'block' : 'none' }}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <span className="close" onClick={close}>×</span>
//         <form>
//           <h2>Login/Sign Up</h2>
//           <input type="text" placeholder="Username" />
//           <input type="text" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };



// export default Modal;


import axios from 'axios'; // Assuming you use Axios for requests

const Modal = ({ show, close, onLoginSuccess }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation (unchanged)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/login', { // Replace with your actual login endpoint URL
        email,
        password, // Hashed password is already sent from the frontend
      });
  
      if (response.status === 200) {
        // Login successful, handle success (e.g., store token, redirect)
        console.log('Login successful!');
        const username = response.data.username; // Assuming username is in response data
        localStorage.setItem('username', username); // Store username in Local Storage
        if (onLoginSuccess) {
          onLoginSuccess(response.data); // Call optional callback prop for success handling (e.g., store token, redirect)
        } else {
          // You can close the modal or display a success message here
        }
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
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

