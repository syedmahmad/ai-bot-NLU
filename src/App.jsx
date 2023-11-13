import Router from './routes';
import 'reactflow/dist/style.css';
import ProjectThemeProvider from './theme';

export default function App() {
  return (
    <ProjectThemeProvider>
      <Router />
    </ProjectThemeProvider>
  );
}
