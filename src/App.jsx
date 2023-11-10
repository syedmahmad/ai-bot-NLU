import { Box } from '@chakra-ui/react';
import { ReactFlowComponent } from './components/reactflow';
import 'reactflow/dist/style.css';
import ProjectThemeProvider from './theme';
import Layout from './components/hoc/layout';

export default function App() {
  return (
    <ProjectThemeProvider>
      <Layout>
        <Box height="100vh" overflow="hidden">
          <ReactFlowComponent />
        </Box>
      </Layout>
    </ProjectThemeProvider>
  );
}
