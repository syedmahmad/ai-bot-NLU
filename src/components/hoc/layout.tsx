import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from '../header';
import Sidebar from '../sidebar';

const Layout = () => {
  return (
    <>
      <Header />
      <Box width="100%" display="flex">
        <Sidebar />
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
