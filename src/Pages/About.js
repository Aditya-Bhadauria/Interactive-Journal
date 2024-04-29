import React, { useState } from 'react';
import { Fade, ScaleFade, Slide, SlideFade, Collapse,useDisclosure,Button,Box,Lorem } from '@chakra-ui/react'

function SlideEx() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
        <Button onClick={onToggle}>Click Me</Button>
        <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            rounded='md'
            shadow='md'
          >
            
          </Box>
        </Slide>
      </>
    )
  }

  export default SlideEx;