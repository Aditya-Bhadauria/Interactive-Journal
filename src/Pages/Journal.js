import React from 'react';
import './Journal.css';
import Gojo from '../images/GojoChibi.jpg'
import { Textarea, Text} from '@chakra-ui/react'

const Journal = () => {
  let [value, setValue] = React.useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  return (
    <div class="container">
    <div class="side-column">
      <div>
      <img src={Gojo} alt="Gojo" style={{ height: '250px', marginRight: '10px' }} />
      
      </div>
      <h2>Aditya Bhadauria</h2>
      <p>Content for the left side column.</p>
    </div>
    <div class="main-content">
      <h2>Main Content Area</h2>
      <p>This is the main content area of the webpage. It will take up the remaining space after the side columns.</p>
      <Text mb='8px'>Value: {value}</Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder='Here is a sample placeholder'
        style={{ height: '600px', width: '800px' }}
      />
    </div>
    
    
  </div>

  );
};

export default Journal;
