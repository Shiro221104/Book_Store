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
        element: <div>Orders</div>,
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
     { path: "/books/:id", element: <BookPage/> },
     { path: "/category/:categoryName",element:<Category/>},
     { path: "/genre/:genreName",element:<Genre/>}
    ],
  },
]);

export default router;
