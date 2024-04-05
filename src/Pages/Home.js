
import Image1 from '../images/Samurai1.jpg'
import Image2 from '../images/Samurai2.jpg'
import Image3 from '../images/Samurai3.jpg'
import React from 'react';
import { useState, useEffect } from 'react';
import '../App';
import '../App.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


import  Navigation  from '../Pages/navigation';
import Footer from '../Pages/Footer';

import {Auth} from '../App'; 

const imageArray = [
    // Add your image URLs here
    Image1,
    Image2,
    Image3
    // ... more images
  ];

const HomePage = () => {
    const [current, setCurrent] = useState(0);
  const length = imageArray.length;
    

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(imageArray) || imageArray.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {imageArray.map((image, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && (
            <img src={image} alt={`Slide ${index}`} className='image' />
          )}
        </div>
      ))}
    </section>
  );
    
};



export default HomePage;