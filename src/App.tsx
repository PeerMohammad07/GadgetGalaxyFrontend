import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Lazy loading the route components
const UserRoutes = lazy(() => import('./Routes/UserRoutes'));
const AdminRoutes = lazy(() => import('./Routes/AdminRoutes'));

function App() {
  const router = createBrowserRouter([
    { path: "/*", element: <UserRoutes /> },
    { path: "/admin/*", element: <AdminRoutes /> },
  ]);

  return (
    <>
      <ToastContainer />
      <Toaster/>
      <Suspense fallback={<><h1>...Loading</h1></>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;