import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('http://localhost:5000/api/data', {
        name,
        age
      });
      console.log(response.data); // Log the response from the backend
      setName(''); // Clear the form after successful submission
      setAge(0);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
      </label>
      <button type="submit">Save Data</button>
    </form>
  );
};

export default MyForm;
