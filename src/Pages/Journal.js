// import React from 'react';
// import './Journal.css';
// import Gojo from '../images/GojoChibi.jpg'
// import { Textarea, Text} from '@chakra-ui/react'

// const Journal = () => {
//   let [value, setValue] = React.useState('')

//   let handleInputChange = (e) => {
//     let inputValue = e.target.value
//     setValue(inputValue)
//   }
//   return (
//     <div class="container">
//     <div class="side-column">
//       <div>
//       <img src={Gojo} alt="Gojo" style={{ height: '250px', marginRight: '10px' }} />
      
//       </div>
//       <h2>Aditya Bhadauria</h2>
//       <p>Content for the left side column.</p>
//     </div>
//     <div class="main-content">
//       <h2> April 20, 2024</h2>
//       <p>Dear Diary</p>
//       <Text mb='8px'>Value: {value}</Text>
//       <Textarea
//         value={value}
//         onChange={handleInputChange}
//         placeholder='Here is a sample placeholder'
//         style={{ height: '600px', width: '800px' }}
//       />
//     </div>
    
    
//   </div>

//   );
  
// };

// export default Journal;


import React, { useState, useEffect } from 'react';
import './Journal.css';
import Gojo from '../images/GojoChibi.jpg';
import { Textarea } from '@chakra-ui/react';
import axios from 'axios'; // For making API requests

const Journal = () => {
  const [title, setTitle] = useState(''); // State for journal title
  const [content, setContent] = useState(''); // State for journal content
  const [journals, setJournals] = useState([]); // To store fetched journals
  const [selectedJournalId, setSelectedJournalId] = useState(null); // To store selected journal ID

  // Function to handle form submission (CREATE or UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = selectedJournalId
        ? await axios.put(`http://localhost:5000/api/journals/${selectedJournalId}`, { title, content }) // Update
        : await axios.post('http://localhost:5000/api/journals', { title, content }); // Create
      console.log(selectedJournalId ? 'Journal updated' : 'Journal created:', response.data);
      setTitle(''); // Clear form after submission
      setContent('');
      setSelectedJournalId(null); // Clear selected journal ID
      fetchJournals(); // Re-fetch journals to update the list
    } catch (error) {
      console.error(selectedJournalId ? 'Error updating journal' : 'Error creating journal:', error);
    }
  };

  // Function to fetch all journals (READ)
  const fetchJournals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/journals');
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  // Function to handle delete operation (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/journals/${id}`);
      console.log('Journal deleted');
      fetchJournals(); // Re-fetch journals to update the list
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  // Function to handle selecting a journal for update
  const handleSelectJournal = (journal) => {
    setTitle(journal.title);
    setContent(journal.content);
    setSelectedJournalId(journal._id); // Update selected journal ID
  };

  // useEffect hook to fetch journals on component mount
  useEffect(() => {
    fetchJournals();
  }, []); // Empty dependency array: fetch only once on mount

  return (
    <div className="container">
      <div className="side-column">
        <div>
          <img src={Gojo} alt="Gojo" style={{ height: '250px', marginRight: '10px' }} />
        </div>
        <h2>Aditya Bhadauria</h2>
        <p>Content for the left side column.</p>
      </div>
      <div className="main-content">
        <h2> April 20, 2024</h2>
        <p>Dear Diary</p>

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Here is a sample placeholder"
          style={{ height: '600px', width: '800px' }}
        />
        <button onClick={handleSubmit}>
          {selectedJournalId ? 'Update Journal' : 'Create Journal'}
        </button>
      </div>

      {journals.length > 0 && (
        <ul>
          {journals.map((journal) => (
            <li key={journal._id}>
              <h3>{journal.title}</h3>
              <button onClick={() => handleSelectJournal(journal)}>Edit</button>
              <button onClick={() => handleDelete(journal._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>

  );

};

export default Journal;




