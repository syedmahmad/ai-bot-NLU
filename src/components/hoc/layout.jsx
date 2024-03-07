import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from '../header';
import Sidebar from '../sidebar';

function Layout() {
  return (
    <>
      <Header />

      <Box
          display="flex"
          marginTop="50px"
          position="fixed"
          width="100%"
      >
        <Sidebar />

        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
