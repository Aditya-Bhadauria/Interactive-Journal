import React, { useState } from 'react';
import '../App.css'; // Make sure to create this CSS file for styling

const Modal = ({ show, close }) => {
  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={close}>×</span>
        <form>
          <h2>Login/Sign Up</h2>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};



export default Modal;
