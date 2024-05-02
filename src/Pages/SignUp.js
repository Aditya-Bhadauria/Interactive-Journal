

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
  FormControl,
  FormErrorMessage, // Import FormErrorMessage
} from '@chakra-ui/react';
import { AddIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; 
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(null); // State for username error message
  const [emailError, setEmailError] = useState(null); // State for email error message
  const [passwordError, setPasswordError] = useState(null); // State for password error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);

    // Validation
    if (!username || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields',
      });
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });

      if (response.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User successfully created!',
        });
        
        onClose();
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Signup failed. Please try again.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
                <FormControl isInvalid={usernameError}>
                  <FormLabel htmlFor='username'>Name</FormLabel>
                  <Input
                    ref={firstField}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id='username'
                    placeholder='Please enter user name'
                  />
                  <FormErrorMessage>{usernameError}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={emailError}>
                  <FormLabel htmlFor='Email'>Email</FormLabel>
                  <Input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    placeholder='Please enter user email'
                  />
                  <FormErrorMessage>{emailError}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={passwordError}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id='password'
                      placeholder='Please enter Your Password'
                    />
                    <InputRightAddon>
                      <Button
                        variant='ghost'
                        onClick={() => setShowPassword(!showPassword)}
                        size='sm'
                        tabIndex='-1'
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>{passwordError}</FormErrorMessage>
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SignUp;

