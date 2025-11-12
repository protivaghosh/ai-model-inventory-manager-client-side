import React, { Children } from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Root/Root';
import Home from '../Home/Home';

import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import ErrorElement from '../ErrorElement/ErrorElement';
import DetailsModel from '../Page/DetailsModel/DetailsModel';
import AddModel from '../Page/AddModel/AddModel';

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
            path: '/add-Model',
         element:(<PrivateRoute>
              <AddModel></AddModel>
            </PrivateRoute>), 
        },
        {
          path: '/models/:id',
          element: (<PrivateRoute>
            <DetailsModel></DetailsModel>
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