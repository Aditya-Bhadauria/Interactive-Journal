
import Image1 from '../images/Samurai1.jpg'
import Image2 from '../images/Samurai2.jpg'
import Image3 from '../images/Samurai3.jpg'
import Image4 from '../images/Journal.jpg'
import Image5 from '../images/Journaltab.jpg'
import Image6 from '../images/Tasktab.jpg'
import React from 'react';
import { useState, useEffect } from 'react';
import '../App';
import '../App.css';
import './LandingPage.css'
import Signup from './SignUp';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useScroll } from "framer-motion"
import { Card, CardHeader, CardBody, CardFooter, Image,Stack,Heading,Text,Divider,Button,ButtonGroup, ChakraProvider,SimpleGrid, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
// import { Element } from 'react-scroll';



import  Navigation  from '../Pages/navigation';
import Footer from '../Pages/Footer';

import {Auth} from '../App'; 

const imageArray = [
    // Add your image URLs here
    Image1,
    Image2,
    
    // ... more images
  ];

const HomePage = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  

  const { scrollYProgress } = useScroll();
  const username = sessionStorage.getItem('username');
console.log(username)
  

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
  <>
    <ChakraProvider>
    <motion.div
     className="progress-bar"
     style={{ scaleX: scrollYProgress }} Hello/> 
    
     
    <div className="landing-page-content">
    <section className="section journal">
      <img src={Image4} alt="Journal" />
      <div className="section-text">
        <h1 className='huge-title'>   ChronoLog</h1>
        <p>Capture your thoughts, experiences, and ideas in a beautiful, organized space.</p>
        {/* {username && (
        <p>Welcome, {username}!</p> */}
      {/* )} */}
        <div>
  <Signup/>
</div>
      </div>
    </section>

    {/* <section className="section tasks">
      <img src={Image4} alt="Tasks" />
      <div className="section-text">
        <h2>Tasks</h2>
        <p>Plan your day, manage your to-dos, and achieve your goals efficiently.</p>
      </div>
    </section> */}
  </div>
  <div>
  <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(500px, 1fr))'>

  <Card maxW='sw'>
  <CardBody>
    <Image
      src={Image5}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
    
      <Heading size='md'>JOURNAL</Heading>
      <Text>
      Jot down your thoughts, experiences, and emotions and store them safely online. Our website lets you create and save journal entries with ease, ensuring your memories are preserved for years to come.
      </Text>
      {/* <Text color='blue.600' fontSize='2xl'>
        $450
      </Text> */}
      
    </Stack>
    
  </CardBody>
  <Divider />
  <CardFooter >
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        <Link to="/journal"> Navigate to Journal</Link>
      </Button>
      {/* <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button> */}
    </ButtonGroup>
  </CardFooter>
</Card>
<Card maxW='sw'>
  <CardBody>
    <Image
      src={Image5}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>TASK MANAGER</Heading>
      <Text>
      Create task lists, set due dates, and track your progress seamlessly alongside your daily reflections.  Organize your thoughts and conquer your goals, all within the same space
      </Text>
      {/* <Text color='blue.600' fontSize='2xl'>
        $450
      </Text> */}
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter >
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        <Link to="/task"> Navigate to Tasks</Link>
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</SimpleGrid>
</div>

<div style={{ textAlign: "center", fontFamily: "Georgia, serif"}}>
  <h1 style={{ fontSize: "25px" }}>"Day by day, what you choose, what you think, and what you do is who you become" — Heraclitus</h1>
</div>


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
    </ChakraProvider>
  </>
  
  );
};




export default HomePage;