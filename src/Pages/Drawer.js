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
  
  function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
  
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
                    id='username'
                    placeholder='Please enter user name'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='username'>Password</FormLabel>
                  <Input
                    
                    id='username'
                    placeholder='Please enter Your Password'
                  />
                </Box>
  
                {/* <Box>
                  <FormLabel htmlFor='url'>Url</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>http://</InputLeftAddon>
                    <Input
                      type='url'
                      id='url'
                      placeholder='Please enter domain'
                    />
                    <InputRightAddon>.com</InputRightAddon>
                  </InputGroup>
                </Box> */}
  
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
              <Button colorScheme='blue'>Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default DrawerExample;