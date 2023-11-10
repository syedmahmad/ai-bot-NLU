import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../header';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box width="100%" display="flex">
        <Sidebar />
        {children}
      </Box>
    </>
  );
};

export default Layout;
