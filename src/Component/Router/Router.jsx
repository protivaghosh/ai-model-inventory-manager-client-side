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
import UpdateModel from '../Page/UpdateModel/UpdateModel';
import MyModel from '../Page/Mymodel/MyModel';
import MyPurchasedModels from '../Page/MyPurchasedModels/MyPurchasedModels';
import AllModels from '../Page/AllModel/AllModel';
import Profile from '../DashBoard/Profile';
import DashBoardLayout from '../DashBoard/DashBoardLayout';
import DashboardHome from '../DashBoard/DashboardHome';

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
        path: '/models',         
        element: <AllModels></AllModels>
      },
        {
          path: '/models/:id',
          element: (<PrivateRoute>
            <DetailsModel></DetailsModel>
          </PrivateRoute>),
        },
        {
           path:'/update-model/:id',
           element:(<PrivateRoute>
            <UpdateModel></UpdateModel>
           </PrivateRoute>)
        },
        {
        path: '/my-models',
        element:(<PrivateRoute>
          <MyModel></MyModel>
        </PrivateRoute>)
        },
        {
         path: '/purchased-models',
         element:(<PrivateRoute>
          <MyPurchasedModels></MyPurchasedModels>
         </PrivateRoute>)
        },
        {
          path : '/profile',
          element : <Profile></Profile>

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

    },
    {
  path: "/dashboard",
  element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
  children: [
    { index: true, element: <DashboardHome /> },
    { path: "my-models", element: <MyModel /> },
    { path: "add-model", element: <AddModel /> },
    { path: "purchased-models", element: <MyPurchasedModels /> },
    { path: "profile", element: <Profile /> }
  ]
}

]);

export default Router;