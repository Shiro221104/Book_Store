import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from "./context/CartContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
