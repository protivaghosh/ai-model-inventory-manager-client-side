import React, { Children } from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Root/Root';
import Home from '../Home/Home';
import AddModel from '../AddModel/AddModel';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
          path : '/',
          element : <Home></Home>
        },
        {
            path: '/addModel',
            element: <AddModel></AddModel>
        },
        {
          path: '/login',
          element : <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
    ]

    }
]);

export default Router;