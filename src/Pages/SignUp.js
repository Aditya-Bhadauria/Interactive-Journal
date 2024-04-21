import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    Box,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Textarea,
    useDisclosure,
    DrawerFooter,
  } from '@chakra-ui/react';
  import { AddIcon } from '@chakra-ui/icons'; // Assuming the AddIcon component is from Chakra UI
  import React, { useState } from 'react';
  import axios from 'axios';
  function SignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log({
  username,
  email,
  password
})
    // Basic validation
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });

      if (response.status) {
        // Signup successful, handle success (e.g., redirect)
        console.log('Signup successful!');
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } 
    catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  
    return (
      <>
        <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
          Join now
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Create a new account
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='username'>Name</FormLabel>
                  <Input
                    ref={firstField}
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    id='username'
                    placeholder='Please enter user name'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='Email'>Email</FormLabel>
                  <Input
                    
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    placeholder='Please enter user email'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='username'>Password</FormLabel>
                  <Input
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    placeholder='Please enter Your Password'
                  />
                </Box>
  
                
  
                <Box>
                  <FormLabel htmlFor='owner'>Select Gender</FormLabel>
                  <Select id='owner' defaultValue='segun'>
                    <option value='segun'>Male</option>
                    <option value='kola'>Female</option>
                    <option value='kola'>Others</option>
                  </Select>
                </Box>
  
                <Box>
                  <FormLabel htmlFor='desc'>Description(Optional)</FormLabel>
                  <Textarea id='desc' />
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}colorScheme='blue'>Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default SignUp;