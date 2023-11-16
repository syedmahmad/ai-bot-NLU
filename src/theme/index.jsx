import React from 'react';
import { colors } from './colors';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { fontSizes, fontWeights, fonts } from './fonts';

function ProjectThemeProvider({ children }) {
  const theme = extendTheme({
    colors: colors,
    fonts: fonts,
    fontSizes: fontSizes,
    fontWeights: fontWeights,
  });

  return (<ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>);
}

export default ProjectThemeProvider;
