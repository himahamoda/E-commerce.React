import React, { createContext, useContext, useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home';
import Wishlist from './Component/Wishlist/Wishlist'
import Cart from './Component/Cart/Cart';
import Products from './Component/Prudoct/Products';
import Categories from './Component/categories/Categories';
import Brands from './Component/Brands/Brands';
import Notfound from './Component/Notfound/Notfound';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import UserContextProvider, { UserContext } from './Context/UserContext';
import Protected from './ProtectedRoute/Protected';
import ProductsDetails from './ProductsDetails/ProductsDetails';
import cartcontextProvider from './Context/Cartcontext';
import CartContextProvider from './Context/Cartcontext';
import { WishContextProvider } from './Context/WishlistContext';
import CheckOut from './Component/CheckOut/CheckOut';
import ForgetPass from './Component/ForgetPass/ForgetPass';
import ResetCode from './Component/Reset/ResetCode';


export default function App() {

  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Protected><Home /></Protected> },
        { path: 'Cart', element: <Protected><Cart /></Protected> },
        { path: 'wishlist', element: <Protected><Wishlist /> </Protected> },
        { path: 'products', element: <Protected><Products /></Protected> },
        { path: 'categories', element: <Protected><Categories /> </Protected> },
        { path: 'brands', element: <Protected> <Brands /></Protected> },
        { path: 'productsdetails/:id', element: <Protected> <ProductsDetails /></Protected> },
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPass/> },
        { path: 'restCode', element: <ResetCode/> },
        { path: 'checkout/:id', element: <CheckOut /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> },

      ]
    }
  ])





  return <>
    <WishContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>

    </WishContextProvider>





  </>
}