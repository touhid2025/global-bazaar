import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import MyProduct from "../pages/MyProduct";
import Cart from "../pages/Cart";
import RegisterLayout from "../layout/RegisterLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Error from "../pages/Error";
import AddProduct from '../pages/AddProduct';
import PrivateRoute from "../provider/PrivateRoute";
import UpdateProduct from "../pages/UpdateProduct";
import ViewProducts from "../pages/ViewProducts";
import ProductDetails from "../pages/ProductDetails";
import Loader from "../component/Loader";




const router = createBrowserRouter([
  {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [
              {
                path: '/',
                element: <Home></Home>,
                hydrateFallbackElement: <Loader></Loader>,
              },
              {
                path: '/all-products',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>,
                hydrateFallbackElement: <Loader></Loader>,
              },
              {
                path: '/update/:id',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <UpdateProduct></UpdateProduct>,
                 hydrateFallbackElement: <Loader></Loader>,
              },
              {
                path: '/categories/:id',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <ViewProducts></ViewProducts>,
                 hydrateFallbackElement: <Loader></Loader>,
              },
              {
                path: '/product/:id',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                 hydrateFallbackElement: <Loader></Loader>,

              },
              {
                path: '/my-products',
                loader: ()=> fetch('http://localhost:3000/products'),
                element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>,
                hydrateFallbackElement: <Loader></Loader>,
              },
              {
                path: '/add-product',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
              },
              {
                path: 'cart',
                element: <PrivateRoute><Cart></Cart></PrivateRoute>,
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
