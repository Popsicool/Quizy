import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import About from './About/About';
import Help from './Help/Help';
import { Auth } from './AuthSection/Auth';
import { 
    createBrowserRouter,
     RouterProvider
 } from 'react-router-dom';



 // create the routes for the application
 const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/help',
        element: <Help />,
      },
      {
        path: './login',
        element: <Auth />,
      }
    ]
  },
 ]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
