import Router from './routes';
import 'reactflow/dist/style.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectThemeProvider from './theme';
import WidgetsProvider from './components/context/WidgetsProvider';

const queryClient = new QueryClient();

export default function App() {
  return (
    <WidgetsProvider>
      <QueryClientProvider client={queryClient}>
        <ProjectThemeProvider>
          <ToastContainer />

          <Router />
        </ProjectThemeProvider>
      </QueryClientProvider>
    </WidgetsProvider>
  );
}
