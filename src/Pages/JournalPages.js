import React from 'react';
import './Journal.css';
import Gojo from '../images/GojoChibi.jpg'
import { Textarea, Text} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import CircleLoader from 'react-spinners/CircleLoader'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  
} from '@chakra-ui/react';

const customStyles= {
    headCells: {
      style: {
        fontSize: 15 + "px",
        fontWeight: 600
      },
    },
    cells: {
      style: {
        fontSize: 13 + "px",
        fontWeight: 500
      },
    },
  };



const MySwal = withReactContent(Swal)





const JournalPages = () => {
  let [value, setValue] = React.useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace 'http://your-backend-url/api/data' with your actual API endpoint
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://your-backend-url/api/data');
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <Text>Loading data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Text color="red.500">Error fetching data: {error.message}</Text>
      </Box>
    );
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
      <h2> April 20, 2024</h2>
      <p>Dear Diary</p>
      <TableContainer mt={4}>
      <Box rounded="lg" overflowX="auto" shadow="md">
        <Table size="sm">
          <Thead>
            <Tr>
              {/* Replace 'column1', 'column2' with your actual table header names */}
              <Th>Column 1</Th>
              <Th>Column 2</Th>
              {/* Add more table header cells as needed */}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr key={row._id}> {/* Replace '_id' with your unique identifier field */}
                <Td>{row.column1}</Td>
                <Td>{row.column2}</Td>
                {/* Add more table cells as needed, accessing data from each row object */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
    </div>
    
    
  </div>

  );
  
};

export default JournalPages;
