import { ReactFlowComponent } from '../components/reactflow';
import { Box } from "@chakra-ui/react";

const FlowPage = () => {
  return(
    <Box height="100vh" overflow="hidden" width={"100%"}>
      <ReactFlowComponent />
    </Box>
  )
}

export default FlowPage;