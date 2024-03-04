import ReactFlowComponent from '../components/reactflow';
import { Box } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';

function FlowPage() {
  return (
    <Box
        height="100vh"
        overflow="hidden"
        width="100%"
    >
      <ReactFlowProvider>
        <ReactFlowComponent />
      </ReactFlowProvider>
    </Box>
  );
}

export default FlowPage;
