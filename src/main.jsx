import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ReactFlowProvider>
    ,
  </React.StrictMode>,
);
