import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
// This file configures the Redux store using Redux Toolkit's
import store from './store';
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import OrderListPage from './pages/admin/OrderListPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: 'shipping',
            element: <ShippingPage />,
          },
          {
            path: 'payment',
            element: <PaymentPage />,
          },
          {
            path: 'placeorder',
            element: <PlaceOrderPage />,
          },
          {
            path: '/order/:id',
            element: <OrderPage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '/',
        element: <AdminRoute />,
        children: [
          {
            path: 'admin/orderlist',
            element: <OrderListPage />,
          },
          {
            path: 'admin/productlist',
            element: <ProductListPage />,
          },
          {
            path: 'admin/product/:id/edit',
            element: <ProductEditPage />,
          },
          {
            path: 'admin/userlist',
            element: <UserListPage />,
          },
          {
            path: 'admin/user/:id/edit',
            element: <UserEditPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
