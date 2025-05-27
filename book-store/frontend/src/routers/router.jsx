import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../componemts/Register";
import Home from "../pages/Home";
import Login from "../componemts/Login";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import BookPage from "../pages/BookPage";
import Books from "../pages/Books";
import Category from "../pages/CategoryPage";
import Genre from "../pages/GenrePage";
import OrderPage from "../pages/OrderPage";
import Profile from "../componemts/Profile";

import SearchingPage from "../pages/SearchingPage";
import AdminDashboard from "../pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/order",
        element: <OrderPage/>
      },
       {
        path: "/users/:id",
        element: <Profile/>
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path:"/cart",
        element:<CartPage/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      },
     {
      path:"/books",
      element: <Books/>
     },
   { path: "/search", element: <SearchingPage /> }, 
{ path: "/admin/dashboard", element: <AdminDashboard /> },
     { path: "/books/:id", element: <BookPage/> },
     { path: "/category/:categoryName",element:<Category/>},
     { path: "/genre/:genreName",element:<Genre/>}
   
    ],
  },
]);

export default router;
