import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Components/Router/Router';
import {
  RouterProvider,
} from "react-router";
import AuthProvider from './Components/AuthProvider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen bg- text-lightText dark:bg-darkBg dark:text-darkText">
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </div>
  </StrictMode>,
)

