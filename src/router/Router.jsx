import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Categories from "../pages/Categories"
import MyProduct from "../pages/MyProduct";
import Cart from "../pages/Cart";
import RegisterLayout from "../layout/RegisterLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Error from "../pages/Error";
import AddProduct from '../pages/AddProduct';
import PrivateRoute from "../provider/PrivateRoute";
import UpdateProduct from "../pages/UpdateProduct";




const router = createBrowserRouter([
  {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [
              {
                path: '/',
                element: <Home></Home>,
              },
              {
                path: '/all-products',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <AllProducts></AllProducts>,
              },
              {
                path: '/update/:id',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <UpdateProduct></UpdateProduct>,
              },
              {
               path: '/categories',
               element: <Categories></Categories>,
              },
              {
                path: '/my-products',
                element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>,
              },
              {
                path: '/add-product',
                element: <AddProduct></AddProduct>
              },
              {
                path: 'cart',
                element: <Cart></Cart>,
              }
            ],
        },
        {
          path: '/log',
          element: <RegisterLayout></RegisterLayout>,
          children: [
            {
              path: '/log/login',
              element: <Login></Login>,
            },
            {
              path: '/log/signup',
              element: <Signup></Signup>,
            }
          ],
        },
        {
          path: '/*',
          element: <Error></Error>,
        },
      
  
]);

export default router;
