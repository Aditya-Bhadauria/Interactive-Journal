
import React, { useState, useEffect } from 'react';
import './Journal.css';
import Gojo from '../images/GojoChibi.jpg';
import { ChakraProvider, Textarea } from '@chakra-ui/react';
import axios from 'axios'; 
import { Box, Button, Text ,Flex} from '@chakra-ui/react';



const Journal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [journals, setJournals] = useState([]); 
  const [selectedJournalId, setSelectedJournalId] = useState(null); 
  const [currentDate, setCurrentDate] = useState('');

  const username = sessionStorage.getItem('username');

  useEffect(() => {
    // Set current date when component mounts
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options));
    fetchJournals();
  }, []);



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
      fetchJournals(); 
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };
  const handleDownload = (journal) => {
    const element = document.createElement("a");
    const file = new Blob([journal.title + "\n\n" + journal.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${journal.title}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };





  
  const handleSelectJournal = (journal) => {
    setTitle(journal.title);
    setContent(journal.content);
    setSelectedJournalId(journal._id);
  };

  
  useEffect(() => {
    fetchJournals();
  }, []); 

  return (
    <ChakraProvider>
    <div className="container">
      <div className="side-column">
        <div>
          <img src={Gojo} alt="Gojo" style={{ height: '250px', marginRight: '10px' }} />
        </div>
        <h1>Welcome,</h1>
        <h2>{username}</h2>
        <p>"a passionate student on a journey through the exciting world of software development"</p>
      </div>
      <Box className="main-content">
        <h2> {currentDate}</h2>
        <p>Work With Journals</p>

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Here is a sample placeholder"
          style={{ height: '600px', width: '800px' }}
        />
        <Button onClick={handleSubmit} colorScheme="blue" mt={4}>
          {selectedJournalId ? 'Update Journal' : 'Create Journal'}
        </Button>
        
      </Box>

      {journals.length > 0 && (
  <Box mt={4}>
    {journals.map((journal) => (
      <Box key={journal._id} borderWidth="1px" borderRadius="lg" p={4} mt={2}>
        <Text fontSize="xl" fontWeight="bold">{journal.title}</Text>
        <Button colorScheme="teal" size="sm" onClick={() => handleSelectJournal(journal)} mt={2}>Edit</Button>
        <Button colorScheme="red" size="sm" onClick={() => handleDelete(journal._id)} ml={2} mt={2}>Delete</Button>
        <Button colorScheme="green" size="sm" onClick={() => handleDownload(journal)} ml={2} mt={2}>Download</Button>
      </Box>
    ))}
  </Box>
)}
    </div>
    </ChakraProvider>
  );
  
};


export default Journal;



