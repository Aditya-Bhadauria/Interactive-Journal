import '../App';
import logo from '../images/ChronoLogLogo-removebg-preview.png'
import React, { useState } from 'react';

function Footer() {
    return (
      <footer className="bg-light text-center p-2">
        <div className="text-center">
          © {new Date().getFullYear()} ChronoLog by Aditya Bhadauria
        </div>
      </footer>
    );
  }
 export default Footer;  