import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FlowPage from '../pages/flowPage';
import Layout from '../components/hoc/layout';
import TablePage from '../pages/tablePage';

function Router() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <TablePage />,
        },
        {
          path: '/flow/:id',
          element: <FlowPage />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
