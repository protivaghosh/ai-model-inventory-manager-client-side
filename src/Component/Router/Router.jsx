import React, { Children } from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Root/Root';
import Home from '../Home/Home';

import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddModel from '../Page/AddModel/AddModel';
import ErrorElement from '../ErrorElement/ErrorElement';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement : <ErrorElement></ErrorElement>,
    children:[
        {
          path : '/',
          element : <Home></Home>
        },
        {
            path: '/addModel',
         element:(<PrivateRoute>
              <AddModel></AddModel>
            </PrivateRoute>), 
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