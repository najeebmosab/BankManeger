import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Login } from "./Components/Login/Login";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { Navbar } from './Components/Navbar/Navbar';
import { UserPanel } from './Components/UserPanel/UserPanel';
import { AddUser } from './Components/AddUser/AddUser';
import { EditUser } from './Components/EditUser/EditUser';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>
    },
    {
      path: "/HomePage",
      element: <Navbar></Navbar>,
      children: [
        {
          path:"",
          element:<UserPanel></UserPanel>
        },
        {
          path:"AddUser",
          element:<AddUser></AddUser>
        },
        {
          path:"EditUser",
          element:<EditUser></EditUser>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
